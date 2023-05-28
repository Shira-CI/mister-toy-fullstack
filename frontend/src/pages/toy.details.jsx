import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    const inventory = toy.inStock ? 'In stock' : 'Not available'

    if (!toy) return <div>Loading...</div>

    return <section className="toy-details">
        <h2>Toy name : {toy.title}</h2>
        <h3>Price: ${toy.price}</h3>
        <h3>Created at: {toy.createdAt}</h3>
        <h3>{inventory}</h3>
        <section>
            {toy.labels.map((label, idx) =>
                <small key={label + idx} >{label} | </small>
            )}
        </section>
        <button onClick={() => navigate('/toy')}> Back </button>
        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>

    </section>
}

