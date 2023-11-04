import React from 'react'
import './bottom.css'
import GraphSec from './GraphSec'

function Section() {
    let list = [1,2,3,4]
    return (
        <div className='sectionBottom'>
            <div className="leftBSec">
                <h1>Dashboard</h1>
                <div className="content">
                    {list.map((e)=>{
                        return <GraphSec key={e}/>
                    })}
                </div>
            </div>
            <div className="rightBSec">
                <h1>Commodities</h1>
                history
            </div>
        </div>
    )
}

export default Section