const express = require('express')
const app = express()
const toyService = require('./services/toy.service')
// const userService = require('./services/user.service')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const labelService = require('./services/label.service')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// App Configuration
// const corsOptions = {
//     origin: [
//         'http://127.0.0.1:8080',
//         'http://localhost:8080',
//         'http://127.0.0.1:3000',
//         'http://localhost:3000'
//     ],
//     credentials: true
// }

// app.use(cors(corsOptions))
// app.use(express.static('public'))
app.use(cookieParser()) // for res.cookies
app.use(express.json()) // for req.body

// **************** label API ****************:
// List
app.get('/api/label', (req, res) => {
    // TODO: get sortBy too
    labelService.query()
        .then(labels => {
            res.send(labels)
        })
        .catch(err => {
            console.log('Cannot load labels')
            res.status(400).send('Cannot load labels')
        })
})

// **************** Toys API ****************:
// List
app.get('/api/toy', (req, res) => {
    const filterBy = req.query
    toyService.query(filterBy)
        .then(toys => {
            res.send(toys)
        })
        .catch(err => {
            console.log('Cannot load toys')
            res.status(400).send('Cannot load toys')
        })
})

// Edit
app.put('/api/toy', (req, res) => {
    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot add toy')

    console.log(req.body)
    const { title, price, _id, labels, createdAt } = req.body
    const toy = {
        title,
        price: +price,
        _id,
        labels,
        createdAt
    }

    toyService.save(toy)  //add loggedinUser
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Cannot add toy')
            res.status(400).send('Cannot add toy')
        })
})

// Add
app.post('/api/toy', (req, res) => {
    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot update toy')

    const { title, price, labels, createdAt, inStock } = req.body
    const toy = {
        title,
        price: +price,
        labels,
        createdAt,
        inStock
    }
    toyService.save(toy) //add loggedinUser
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Cannot update toy')
            res.status(400).send('Cannot update toy')
        })

})

// Read - getById
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then(toy => res.send(toy))
        .catch(err => res.status(403).send(err))
})

// Remove
app.delete('/api/toy/:toyId', (req, res) => {
    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot delete toy')

    const { toyId } = req.params
    toyService.remove(toyId) //add loggedinUser
        .then(msg => {
            res.send({ msg, toyId })
        })
        .catch(err => {
            console.log('err:', err)
            res.status(400).send('Cannot remove toy, ' + err)
        })
})


// Listen will always be the last line in our server!
// app.listen(3030, () => console.log('Server listening on port 3030!'))

const port = process.env.PORT || 3030

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})