import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/toy.action.js"
import { toyService } from "../services/toy.service.js"
import { labelService } from '../services/label.service.js'


export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [labels, setLabels] = useState([])

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!toyId) return
        labelService.query()
        .then(labels => {
            setLabels(labels)
            loadToy()
        })
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(setToyToEdit)
            .catch(err => {
                console.log('Had issued in toy edit:', err);
                navigate('/toy')
                showErrorMsg('Toy not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        console.log(toyToEdit)
        saveToy(toyToEdit)
            .then((savedToy) => {
                navigate('/toy')
                showSuccessMsg(`Toy '${savedToy._id}' saved!`)
            })
    }

    const { title, price } = toyToEdit

    return (
        <section className="toy-edit-container">
            <h2>Update Toy</h2>

            <form className="toy-edit-inputs" onSubmit={onSaveToy}>
                <label htmlFor="title">Name:</label>
                <input required onChange={handleChange} value={title} type="text" name="title" id="title" placeholder="Enter new name" />
         
                <label htmlFor="price">Price:</label>
                <input required onChange={handleChange} value={price} type="number" name="price" id="price" placeholder="Enter new price" />

                <button> Save </button>
            </form>

            <button onClick={() => navigate('/toy')}> Back </button>

        </section>
    )
}