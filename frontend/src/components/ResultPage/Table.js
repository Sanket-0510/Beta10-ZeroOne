import React from 'react'
import "./table.css"

function Table(props) {

    const priceData = props.prices;
    return (
        <>
            <table className="rwd-table m-auto mt-5 w-50">
                <tbody>

                    <tr>
                        <th>Date</th>
                        <th>Price</th>
                    </tr>
                    <tr>

                        <td data-th="Date">6-11-2023</td>
                        <td data-th="Price">{priceData[0]}</td>
                    </tr>
                    <tr>

                        <td data-th="Date">7-11-2023</td>
                        <td data-th="Price">{priceData[1]}</td>
                    </tr>
                    <tr>
                        <td data-th="Date">8-11-2023</td>
                        <td data-th="Price">{priceData[2]}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Table