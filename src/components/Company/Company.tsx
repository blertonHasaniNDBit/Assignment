import React, { useEffect, useState } from 'react'
import TimeSlots from '../TimeSlots/TimeSlots'
import './Company.css'

const Company = (props: any) => {
  const { data, handleClick, reservations } = props
  const [reserved, setReserved] = useState([])
  useEffect(() => {
    const reservedItems = reservations.map((el: any) => {
      if (el.companyId === data.companyId) {
        return el.start_time + '-' + el.end_time
      }
    })
    setReserved(reservedItems)
  }, [reservations])

  return (
    <div>
      <div className='companyName'>
        {data.days && data.companyName}
      </div>
      {reserved && <div className='companyName'>
        <div className='timeSlot'>{reserved}</div>
      </div>}
      <div className='timeSlotsContainer'>
        {
          data.days &&
                    <TimeSlots data={data} handleClick={handleClick} />
        }
      </div>
    </div>
  )
}

export default Company