/* eslint-disable react/react-in-jsx-scope */
import './TimeSlots.css'
import TimeSlot from '../TimeSlot/TimeSlot'

const TimeSlots = (props: any) => {
  const { data, handleClick } = props
  return (
    <div>
      {data.days && data.days.map((el: any) => <TimeSlot data={el} key={el.day} handleClick={handleClick} />)}
    </div>
  )
}

export default TimeSlots