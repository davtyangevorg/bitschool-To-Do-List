import React, { useRef, memo } from 'react'

import styles from './dateRange.module.scss'


import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const DateRange = memo(({ startDate, setStartDate, endDate, setEndDate,title }) => {

    const ref = useRef()

    const onChange = dates => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const DateCustomInput = React.forwardRef((props, ref) => {

        return (
            <div className={styles.date} onClick={props.onClick} ref={ref}>
                <span>{title} Date</span>
            </div>
        )

    })

    return (
        <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            customInput={<DateCustomInput ref={ref} />}
            selectsRange
        />
    );
})


export default DateRange
