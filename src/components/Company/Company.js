import React, { useEffect, useState } from 'react';
import TimeSlots from '../TimeSlots/TimeSlots';
import './Company.css'
import has from '../utils/has'

const Company = ({ data, handleClick, reservations }) => {
    const [reserved, setReserved] = useState([])
    useEffect(() => {
        let reservedItems = reservations.map((el) => {
            if (el.companyId === data.companyId) {
                return el.start_time + "-" + el.end_time
            }
        })
        setReserved(reservedItems)
    }, [reservations])

    return (
        <div>
            <div className='companyName'>
                {has(data.days) && data.companyName}
            </div>
            {reserved && <div className='companyName'>
                <div className='timeSlot'>{reserved}</div>
            </div>}

            <div className='timeSlotsContainer'>
                {
                    has(data.days) &&
                    <TimeSlots data={data} handleClick={handleClick} />
                }
            </div>

        </div>
    );
};

export default Company;