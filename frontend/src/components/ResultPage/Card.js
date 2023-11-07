import React, {useState} from 'react'


function Card(props) {
    const [imgGot, setimgGot] = useState("https://source.unsplash.com/random/400x400")

    const cardData = props.data;

    console.log("s")

    // console.log(cardData.ndtd_Commodity)
    return (
        cardData && <div className="card mb-3" style={{ maxWidth: '70rem', maxHeight: '42%', border: 'none' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={imgGot} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8 center">
                    <div className="card-body d-flex flex-column align-items-center">
                        <h3 className="card-title ">{cardData.ndtd_Commodity}</h3>
                        <div className="innerresdata">
                        <h4 className="card-text">Price : <span style={{ fontWeight: 'normal' }}>
    {cardData.ndtd_Modal_Price == 0 ? "Not Available" : "Rs " + cardData.ndtd_Modal_Price}
</span></h4>


                            <h4 className="card-text">State : <span style={{ fontWeight: 'normal' }}>{cardData.ndtd_State}</span></h4>
                            <h4 className="card-text">Mandi : <span style={{ fontWeight: 'normal' }}>{cardData.ndtd_Mandi}</span></h4>
                            <p className="card-text"><small className="text-body-secondary">{Date(Date.now()).toLocaleString()}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card