///////////////////////////  import-export  ///////////////////////

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onRemoveLoc = onRemoveLoc
window.onAddLoc = onAddLoc
window.renderLocs = renderLocs
window.onSearchLoc = onSearchLoc



////////////////////////////////////////////////////////////////////

function onInit() { // added
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() { // added
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() { // added
    locService.getLocs()
        .then(locs => {
            renderLocs(locs)
            // console.log('Locations:', locs)
            // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() { // added
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            onPanTo(pos.coords.latitude, pos.coords.longitude)
            mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude })
            locService.addLoc('My location', { lat: pos.coords.latitude, lng: pos.coords.longitude })
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo(lat = 35.6895, lng = 139.6917) { // added
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
    mapService.addMarker({ lat, lng })
}

// function onPanToUserLoc() {
//     navigator.geolocation.getCurrentPosition(mapService.setCenterToUserLoc)
// }

function onRemoveLoc(locId) { // added
    // const id = prompt('Enter id')
    locService.deleteLoc(locId).then(locService.getLocs()
        .then(() => renderLocs()))
}

function onAddLoc() { // added
    const locName = prompt('Enter name')
    const newLoc = locService.addLoc(locName)
    locService.save(newLoc)
        .then(renderLocs)
}

function renderLocs(locs) { // added
    console.log('rendering...')
    console.log('locs:', locs)
    var strHTMLs = ''

    locs.forEach(location => {
        strHTMLs += `<tr>
                        <td>${location.name}</td>
                        <td>${location.lat}</td>
                        <td>${location.lng}</td>
                        <td><button onclick="onPanTo(${location.lat},${location.lng})">Go</button>
                        <button onclick="onRemoveLoc(${location.id})">Delete</button></td>
                        </tr>`
    })
    document.querySelector('.location-table').innerHTML += strHTMLs
    //<td>${location.id}</td>
    // <td>${location.createdAt}</td>
    // <td>${location.updatedAt}</td>
}

function onSearchLoc(ev) { // added
    ev.preventDefault()

    const searchLoc = document.querySelector('search-input').value
    console.log('searchLoc:', searchLoc)
    mapService.goToSearchLocation(searchLoc).then(searchLoc => {
        onPanTo(searchLoc.pos.lat, searchLoc.pos.lng)
    })
}

function renderMarkers(places) {
    window.markers = []
    places.forEach(place => {
        window.markers.push(mapService.addMarker({ lat: place.lat, lng: place.lng }, place.name))
    })
    console.log(window.markers)
}

