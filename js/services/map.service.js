export const mapService = {
    initMap,
    addMarker,
    panTo,
    goToUserPos,
    goToSearchLocation
}

const API_KEY = 'AIzaSyBhvpuMRtf5WHkvqgU3_jjbE3gC5La_mKI' //DONE: Enter your API Key

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map1!', gMap)
            gMap.addListener('click', ev => {
                const lat = ev.latLng.lat()
                const lng = ev.latLng.lng()

                addMarker(ev.latLng)
                panTo(lat, lng)
            })
            console.log('Map2!', gMap)
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function goToUserPos() {
    if (!navigator.geolocation) return
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrPos(resolve, reject)
    ).then(res => {
        console.log('lat:', res.coords.latitude)
        console.log('lng:', res.coords.longitude)
        return {
            lat: res.coords.latitude,
            lng: res.coords.longitude,
        }
    })
}

function goToSearchLocation(locSearch) {
    console.log(locSearch)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${locSearch}&key=${API_KEY}`
    return fetch(url)
        .then((res) => {
            console.log(res)
            // need to fill HERE
        })
        .catch(err => console.log(err))
}