///////////////////////////////  import-export  /////////////////////

import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const locService = {
    getLocs,
    addLocation,
    deleteLocation,
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

const LOCATION_KEY = 'locationDB'

<<<<<<< HEAD
// const locs = _createLocations
const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]
=======
// const locs = _createLocations()

>>>>>>> 19c03c6fbd4eaa0f6608b89ba1d7795cbf1948cc

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

//////////////////////////////  CRUDL  ////////////////////////////

function addLocation(loc, name) {
    locs.push(_createNewLocation(loc, name))
    storageService.save(LOCATION_KEY, locs)
}

function deleteLocation(locId) {
    const locIdx = locs.findIndex(loc => loc.id === locId)
    locs.splice(locIdx, 1)
    // return storageService.remove(PET_KEY, petId)
}

//////////////////////  privet _functions  //////////////////////

function _createNewLocation(name, pos) {
    return {
        id: utilService.makeId(),
        name,
        pos, // lat, lng
        weather,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}

function _createLocations() {
    let locs = storageService.load(LOCATION_KEY)

    if (!locs || !locs.length) {
        locs = [
            _createNewLocation('Greatplace', { lat: 32.047104, lng: 34.832384 }),
            _createNewLocation('Neveragain', { lat: 32.047201, lng: 34.832581 },),
        ]
    }
    storageService.save(LOCATION_KEY, locs)
    return locs
}
