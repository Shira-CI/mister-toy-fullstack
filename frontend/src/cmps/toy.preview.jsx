import { Link } from "react-router-dom";


export function ToyPreview({ toy, onRemoveToy }) {
    return (
        <article className="toy-preview">
            <Link className="details-a-link" to={`/toy/${toy._id}`}>
            <h4>{toy.title}</h4>
            <img src={toy.image} alt="" />

            <p>Price: <span>{toy.price}$</span></p>
            {toy.inStock && <span className="toy-available">Toy Available</span>}
            {!toy.inStock && <span className="toy-available">Toy Unavailable</span>}
            </Link>
            <section>
                <button> <Link to={`/toy/edit/${toy._id}`}>Edit</Link> </button>
                <button onClick={() => { onRemoveToy(toy._id) }}>Remove Toy</button>
            </section>
        </article>
    )
}

