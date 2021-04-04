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
                <span style={{marginRight:'10px'}}>{title} Date</span>
                <span>{props.startDate && props.startDate.toISOString().slice(0, 10)}</span>
                <span>{props.endDate && ' - ' + props.endDate.toISOString().slice(0, 10)}</span>
            </div>
        )

    })

    return (
        <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            customInput={<DateCustomInput ref={ref} startDate={startDate} endDate={endDate} />}
            selectsRange
            dateFormat="MMMM d, yyyy"
        />
    );
})


export default DateRange
