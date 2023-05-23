import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return <article>
        <h4>{toy.title}</h4>
        <p>Price: <span>{toy.price}$</span></p>
        {toy.inStock && <span>Toy available</span>}

        <br />
        <Link to={`/toy/${toy._id}`}>Details</Link> |
        <br />
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>

    </article>
}

