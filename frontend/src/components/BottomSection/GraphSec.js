import React from 'react'
import gim1 from '../../res/line3.png'

function GraphSec(props) {
    return (
        <div className='graphCard'>
            <div className="card" >
                <iframe width="400" height="250" src={props.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <div className="card-body">
                    <h5 className="card-title">{"News" + props.in}</h5>
                </div>
            </div>
        </div>
    )
}

export default GraphSec