let labels = require('../data/label.json')

function query() {
    return Promise.resolve(labels)
}

module.exports = {
    query
}