import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'

import { toyService } from "../services/toy.service"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from "../store/toy.action"
import { ToyList } from "../cmps/toy.list"
import { ToyFilter } from "../cmps/toy.filter"
import { ToySort } from '../cmps/toy-sort'


export function ToyIndex() {

    const dispatch = useDispatch()
    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const [sortBy, setSortBy] = useState({ type: '', desc: 1 })

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    // console.log(toys)

    useEffect(() => {
        loadToys(filterBy , sortBy)
    }, [filterBy , sortBy])

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
            <section className='index-container'>

            <section className='toys-filter-container'>
                <ToyFilter onSetFilter={onSetFilter} />
                <ToySort sortBy={sortBy} setSortBy={setSortBy} />



                <button className='add-toy-btn'>
                <Link to={`/toy/edit`}>Add Toy</Link>
                </button>
            </section>

                {isLoading && <h4>Loading...</h4>}

              <ToyList 
              toys={toys}
              onRemoveToy={onRemoveToy}
              />
            </section>
    )



}