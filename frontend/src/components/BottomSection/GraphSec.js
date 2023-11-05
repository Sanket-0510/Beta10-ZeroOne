import React from 'react'
import gim1 from '../../res/line3.png'

function GraphSec(props) {
    return (
        <div className='graphCard'>
            <div className="card" >
                <img src={gim1} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{"News" + props.in}</h5>
                </div>
            </div>
        </div>
    )
}

export default GraphSec