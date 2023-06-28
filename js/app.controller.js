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
Window.renderLocs = renderLocs



////////////////////////////////////////////////////////////////////

function onInit() {
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

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            renderLocs(locs)
            // console.log('Locations:', locs)
            // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onPanToUserLoc() {
    navigator.geolocation.getCurrentPosition(mapService.setCenterToUserLoc)
}



function onRemoveLoc(locId) {
    // const id = prompt('Enter id')
    locService.remove(locId)
        .then(() => renderLocs())
}

function onAddLoc() {
    const locName = prompt('Enter name')
    const newLoc = locService.addLoc(locName)
    locService.save(newLoc)
        .then(renderLocs)
}

function renderLocs(locs) {
    console.log('rendering...')
    console.log('locs:', locs)
    var strHTMLs = ''

    locs.forEach(location => {
        strHTMLs += `<tr>
                        <td>${location.name}</td>
                        <td>${location.lat}</td>
                        <td>${location.lng}</td>
                        <><button onclick="mapService.panTo(${location.lat},${location.lng})">Go</button>
                        <button onclick="locService.deleteLocation(${location.id})">Delete</button></td>
                        </tr>`
    })
    document.querySelector('.location-table').innerHTML += strHTMLs
    //<td>${location.id}</td>
    // <td>${location.createdAt}</td>
    // <td>${location.updatedAt}</td>
}

