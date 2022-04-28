import React, { useEffect, useState } from 'react';
import './TimeSlots.css'
import TimeSlot from '../TimeSlot/TimeSlot';
import has from '../../components/utils/has'

const TimeSlots = ({ data, handleClick, reservations }) => {

    return (
        <div className='timeSlots'>
            {has(data.days) && data.days.map((el) => <TimeSlot data={el} key={el.day} handleClick={handleClick} />)}
        </div>
    );
};

export default TimeSlots;