// import PropTypes from 'prop-types'

import { ToyPreview } from "./toy.preview";

export function ToyList({ toys, onRemoveToy }) {
    return <ul className="toy-list">
        {toys.map(toy =>

            <li className="toy-preview-container" key={toy._id}>
                <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
            </li>)}
    </ul>
}

