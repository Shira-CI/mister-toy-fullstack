import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
// import { storageService } from './async-storage.service.js'
// import { userService } from '../services/user.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
'Outdoor', 'Battery Powered']


export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

let gToys
// _createToys()


function query(filterBy = {}) {
    // return storageService.query(STORAGE_KEY).then(toys => toys)
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    // return storageService.get(STORAGE_KEY, toyId)
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    // return storageService.remove(STORAGE_KEY, toyId)
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    console.log(toy)
    const method = (toy._id) ? 'put' : 'post'
    return httpService[method](BASE_URL, toy)


    // if (toy._id) {
    //     return storageService.put(STORAGE_KEY, toy)
    // } else {
    //     return storageService.post(STORAGE_KEY, toy)
    // }
}

function getEmptyToy() {
    return {
        title:'',
        price: utilService.getRandomIntInclusive(50 , 150),
        labels: [],
        createdAt: Date.now(),
        inStock: true
    }
}

function getDefaultFilter() {
    return { title: '', maxPrice: ''}
}


// Private functions

function _createToys() {
    gToys = utilService.loadFromStorage(STORAGE_KEY)
    if (gToys && gToys.length > 0) return

    gToys = [
        _createToy('aa'),
        _createToy('bb'),
        _createToy('cc'),
        _createToy('dd'),
        _createToy('ee'),
        _createToy('ff'),
    ]
    _saveToys()
}

function _createToy(title) {
    return {
        _id: utilService.makeId(),
        title,
        price: utilService.getRandomIntInclusive(50 , 150),
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: Date.now(),
        inStock: true
    }
}

function _saveToys() {
    utilService.saveToStorage(STORAGE_KEY, gToys)
}




