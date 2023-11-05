import React from 'react'
import './bottom.css'
import GraphSec from './GraphSec'

function Section() {
    let list = [1,2,3,4]
    return (
        <div className='sectionBottom'>
            <div className="leftBSec">
                <h2>Dashboard</h2>
                <div className="content">
                    {list.map((e, ind)=>{
                        return <GraphSec key={e} in = {ind}/>
                    })}
                </div>
            </div>
            <div className="rightBSec">
                <h2>Commodities</h2>
                history
            </div>
        </div>
    )
}

export default Section