import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'

import { toyService } from "../services/toy.service"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from "../store/toy.action"
import { ToyList } from "../cmps/toy.list"
import { ToyFilter } from "../cmps/toy.filter"



export function ToyIndex() {

    const dispatch = useDispatch()
    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    // console.log(toys)

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy('Random toy')

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onSetFilter(filterBy) {
        // console.log('FilterBy', filterBy)
        setFilterBy(filterBy)
    }

    return (
        <section>
            <main>

            <section className='toys-filter-container'>
                <ToyFilter onSetFilter={onSetFilter} />
                <button className='add-toy-btn'>

                <Link to={`/toy/edit`}>Add Toy</Link>
                </button>
                {/* <button onClick={onAddToy}>Add random Toy </button> */}
            </section>

                {isLoading && <h4>Loading...</h4>}

              <ToyList 
              toys={toys}
              onRemoveToy={onRemoveToy}
              />
            </main>
        </section>
    )



}