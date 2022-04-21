import React from 'react';
import TimeSlots from '../TimeSlots/TimeSlots';
import './Company.css'
import has from '../utils/has'

const Company = ({data, handleClick}) => {
    return (
        <div>
            <div className='companyName'>
                {has(data.days) && data.companyName}
            </div>

            <div className='timeSlotsContainer'>
                {
                    has(data.days) &&
            <TimeSlots data={data} handleClick={handleClick}/>
            }
            </div>

        </div>
    );
};

export default Company;