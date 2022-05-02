import React, { useState, useEffect } from 'react'
import Company from '../../components/Company/Company'
import './Companies.css'
import data from '../../data/time_slots.json'
import dayjs from 'dayjs'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidv4 } = require('uuid')

interface companiesInterface {
    id?: number
    name?: string
    type?: string
    time_slots?: any
}

interface typeTimeslots {
    start_time: string
    end_time: string
}

interface typeSlots {
    companyId: number
    day: string
    end_time: string
    slotId: string
    start_time: string
    state: string
}

interface typeReservations {
    companyId: number
    end_time: string
    selectedDay: string
    slotId: string
    start_time: string
}

const Companies = () => {
  const [companies, setCompanies] = useState<companiesInterface[]>([])
  const [companiesFormatted, setCompaniesFormatted] = useState([])
  const [reservations, setReservations] = useState<typeReservations[]>([])
  const [slotsState, setSlotsState] = useState([])

  useEffect(() => {
    setCompanies(data)
  }, [])

  useEffect(() => {
    const allSlots:any = companies.map((comp: companiesInterface) => {
      const slots = comp.time_slots.map((slot: typeTimeslots) => {
        return {
          ...slot,
          start_time: dayjs(slot.start_time.toString()).format('HH:mm'),
          end_time: dayjs(slot.end_time.toString()).format('HH:mm'),
          day: dayjs(slot.start_time.toString()).format('M/D/YYYY'),
          companyId: comp.id,
          state: 'enabled',
          slotId: uuidv4()
        }
      })
      return slots
    })

    // eslint-disable-next-line prefer-spread
    const mergedSlots = [].concat.apply([], allSlots)
    setSlotsState(mergedSlots)

  }, [companies])

  useEffect(() => {
    const companiesFormatted = companies.map((company: companiesInterface) => {
      const filteredByCompany = slotsState.filter((slot: typeSlots) => slot.companyId === company.id)
      return {
        ...company,
        time_slots: filteredByCompany,
      }
    })

    const formatedDate = companiesFormatted.map((company) => {
      const slots = company.time_slots.map((slot: typeSlots) => {
        return {
          ...slot,
          companyId: company.id,
        }
      })
      return {
        company: company.name,
        slots,
        companyId: company.id,
      }
    })

    const groupedByDayArray: any = formatedDate.map((company) => {
      const GroupedByDayObj: any = {}

      company.slots.forEach((element) => {
        const dayKey: any = element.day

        if (!GroupedByDayObj[dayKey]) {
          GroupedByDayObj[dayKey] = []
        }
        GroupedByDayObj[dayKey].push({
          ...element
        })
      })

      const sortedByDate: any = Object.entries(GroupedByDayObj).sort(function (a: any, b: any) {
        const date1: any = new Date(a[0])
        const date2: any = new Date(b[0])
        const data = date1 - date2
        return data
      })

      const joinedSortedArray = sortedByDate.map((el: string) => {
        return {
          day: dayjs(el[0]).format('dddd'),
          date: dayjs(el[0]).format('L'),
          slots: el[1]
        }
      })

      return {
        days: joinedSortedArray,
        companyName: company.company,
        companyId: company.companyId,
      }
    })

    setCompaniesFormatted(groupedByDayArray)

  }, [slotsState])

  useEffect(() => {
    const slotIds: any = reservations.map((el: typeReservations) => el.slotId)
    const touchedSlots: any = slotsState.map((element: any) => {
      const booleanRes = reservations.some((reserve: any) => (element.start_time.toString() >= reserve.start_time.toString()
                && element.start_time.toString() < reserve.end_time.toString()
                || (element.end_time.toString() <= reserve.end_time.toString() && element.end_time.toString() > reserve.start_time.toString()))
                && reserve.selectedDay == element.day
      )

      if (booleanRes && !slotIds.includes(element.slotId)) {
        return {
          ...element,
          state: 'disabled',
        }
      } else if (slotIds.includes(element.slotId)) {
        return {
          ...element,
          state: 'reserved',
        }
      }
      else {
        return {
          ...element,
          state: 'enabled'
        }
      }
    })
    setSlotsState(touchedSlots)

  }, [reservations])

  const handleClick = (start_time: string, end_time: string, selectedDay: string, companyId: number, slotId: any) => {
    if (reservations.length === 0 || !reservations.some((el: typeReservations) => el.companyId === companyId)) {
      setReservations([...reservations, {
        start_time,
        end_time,
        selectedDay,
        companyId,
        slotId
      }])
    } else if (reservations.some(el => el.slotId === slotId)) {
      const filteredSlots = reservations.filter((el) => el.slotId !== slotId)
      setReservations(filteredSlots)
    }
  }

  return (
    <div className='companiesContainer'>
      {
        companiesFormatted && companiesFormatted.map((company: any) => <Company data={company} handleClick={handleClick} key={company._id} reservations={reservations} />)
      }
    </div>
  )
}

export default Companies