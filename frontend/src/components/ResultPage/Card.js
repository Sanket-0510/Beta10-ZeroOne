import React from 'react'


function Card(props) {

    const cardData = props.data;
    return (
        <div className="card mb-3" style={{ maxWidth: '70rem', maxHeight:'42%', border:'none' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={cardData.img} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8 center">
                    <div className="card-body d-flex flex-column align-items-center">
                        <h3 className="card-title ">{cardData.title}</h3>
                        <div className="innerresdata">
                            <h4 className="card-text" >Price : <span style={{ fontWeight: 'normal' }}>{"Rs " + cardData.price}</span></h4>

                            <h4 className="card-text">State : <span style={{ fontWeight: 'normal' }}>{cardData.states.map(e => e + ', ')}</span></h4>
                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card