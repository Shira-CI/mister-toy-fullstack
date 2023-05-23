
// * Services
import { httpService } from './http.service.js'

const BASE_URL = 'label/'

export const labelService = {
    query
}

function query() {
    return httpService.get(BASE_URL)
    // return storageService.query(STORAGE_KEY).then(labels => labels)
}