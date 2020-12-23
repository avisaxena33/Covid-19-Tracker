import React from 'react'
import './index.css'

const Card = ({ data }) => {
    return (
        <div className="card">
            <h1>{data.key ? data.key : 'Unknown'}</h1>
            <h2>{data.value ? data.value : 'Unknown'}</h2>
        </div>
    )
}

export default Card
