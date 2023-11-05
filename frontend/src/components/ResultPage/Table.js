import React, { useContext } from 'react'
import "./table.css"
import NewContext from '../../Context/NewContext';
function Table(props) {
    const context = useContext(NewContext)
    const priceData = props.prices;
    console.log("priceData",priceData)
        return (
        <>
            <table className="rwd-table m-auto mt-5 w-50">
                <tbody>

                    <tr>
                        <th>Date</th>
                        <th>Price</th>
                    </tr>
                    {
                        priceData.result && priceData.result.slice(4,7).map((price, index) => {
                            return <tr key={price}>
                                <td data-th="Date">{`${6+index}-11-2023`}</td>
                                <td data-th="Price">{price}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Table