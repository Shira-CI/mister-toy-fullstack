
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"

export function ToyFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    // onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // onSetFilter.current(filterByToEdit)
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        console.log(filterByToEdit)
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="toy-filter">
        <h3>Filter By:</h3>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="title">Name:</label>
            <input type="text"
                id="title"
                name="title"
                placeholder="By name"
                value={filterByToEdit.title}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />

            <label htmlFor="inStock">In Stock:</label>
            <select className="filter-by-inStock" onChange={handleChange} name="inStock" id="inStock"  >
                <option value="all">All</option>
                <option value="inStock">Available</option>
                <option value="notInStock">Not Available</option>
            </select>

            <label htmlFor="label">Labels:</label>
            <select className="filter-by-label" onChange={handleChange} name="label" id="label"  >
                <option value="all">All</option>
                <option value="On wheels">On wheels</option>
                <option value="Art">Art</option>
                <option value="Doll">Doll</option>
                <option value="Baby">Baby</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Box game">Box game</option>
                <option value="Battery Powered">Battery Powered</option>
            </select>

        </form>
    </section>
}