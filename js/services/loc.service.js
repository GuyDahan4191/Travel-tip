///////////////////////////////  import-export  /////////////////////

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { regStorageService } from './storage.service.js'

export const locService = {
    getLocs,
    addLoc,
    deleteLoc,
}

const LOCATION_KEY = 'locationDB'

// const locs = _createLocs()
const locs = [
    {
        id: 1,
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        weather: 'cold',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        name: 'Neveragain',
        lat: 32.047104,
        lng: 34.832384,
        weather: 'hot',
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

//////////////////////////////  CRUDL  ////////////////////////////

function addLoc(name, loc) {
    locs.push(_createNewLoc(name, loc))
    storageService.save(LOCATION_KEY, locs)
}

function deleteLoc(locId) {
    return storageService.remove(LOCATION_KEY, locId)
}

//////////////////////  privet _functions  //////////////////////

function _createNewLoc(name, lat, lng, weather = "cold") {
    return {
        id: utilService.makeId(),
        name,
        lat,
        lng,
        weather,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}

function _createLocs() {
    let locs = regStorageService.load(LOCATION_KEY)

    if (!locs || !locs.length) {
        locs = [
            _createNewLoc('Greatplace', 32.047104, 34.832384),
            _createNewLoc('Neveragain', 32.047201, 34.832581)
        ]
    }
    regStorageService.save(LOCATION_KEY, locs)
    console.log('locs:', locs)
    return locs
}

