// import PropTypes from 'prop-types'

import { ToyPreview } from "./toy.preview";


export function ToyList({ toys ,onRemoveToy}) {
    return <ul className="toy-list">
        {toys.map(toy => 

            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />
                <section>
                    <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
                </section>

            </li>)}
    </ul>
}

