import React from 'react'
import './bottom.css'
import GraphSec from './GraphSec'


function Section() {
    let list = ["https://www.youtube.com/embed/f91s8-C4lzw?si=69xyn1wYKNnn0q_v", "https://www.youtube.com/embed/DjHGG7eQevY?si=Zb5XSK095F9HY7Sa", "https://www.youtube.com/embed/jOlyTKOUn9I?si=86jDDHdQl5aq4z03", "https://www.youtube.com/embed/YhfQkG2QeMo?si=3KqrOraF-Kz4jTKU"]
    return (
        <div className='sectionBottom'>
            <div className="leftBSec">
                <h2>Dashboard</h2>
                <div className="content">
                    {list.map((e, ind)=>{
                        return <GraphSec key={ind} in = {ind+1} link={e}/>
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