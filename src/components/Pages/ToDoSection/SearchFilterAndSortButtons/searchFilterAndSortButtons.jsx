import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import styles from './searchFilterAndSortButtons.module.scss'

import Search from './Search/search.jsx'
import Dropdown from '../../../Features/Dropdown/dropdown.jsx'
import DateRange from './DateRange/dateRange.jsx'

import { getTasks } from '../../../../redux/toDo-reducer.js'

import { FaFilter, FaSortAmountDownAlt,IoFilter,ImCross } from 'react-icons/all'

const statusOptions = [
    { label: 'None', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Done', value: 'done' }
]
const sortOptions = [
    { label: 'A-Z', value: 'a-z' },
    { label: 'Z-A', value: 'z-a' },
    { label: 'Creation_Oldest', value: 'creation_date_oldest' },
    { label: 'Creation_Newest', value: 'creation_date_newest' },
    { label: 'Completion_Oldest', value: 'completion_date_oldest' },
    { label: 'Completion_Newest', value: 'completion_date_newest' },
]

const SearchFilterAndSortButtons = () => {

    const [isShowBurger, setIsShowBurger] = useState(false)
    const [isShowFilter,setIsShowFilter] = useState(false)

    const [searchValue, setSearchValue] = useState('')

    const [status, setStatus] = useState(statusOptions[0])

    const [sort, setSort] = useState(sortOptions[0])

    const [createStartDate, setCreateStartDate] = useState(null)
    const [createEndDate, setCreateEndDate] = useState(null)

    const [completeStartDate, setCompleteStartDate] = useState(null)
    const [completeEndDate, setCompleteEndDate] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        function media() {
            if (window.innerWidth <= 1400) return setIsShowBurger(true)
            return setIsShowBurger(false)
        }
        window.addEventListener('resize', media)
        return () => {
            window.removeEventListener('resize', media)
        }
    })
    useEffect(() => {
        if(window.innerWidth<=1400){
            setIsShowBurger(true)
        }
    }, [])

    const handleSearch = () => {
        const queryParams = {}

        searchValue && (queryParams.search = searchValue)
        status.value && (queryParams.status = status.value)
        sort.value && (queryParams.sort = sort.value)
        createStartDate && (queryParams.create_lte = createStartDate.toISOString().slice(0, 10))
        createEndDate && (queryParams.create_gte = createEndDate.toISOString().slice(0, 10))
        completeStartDate && (queryParams.complete_lte = completeStartDate.toISOString().slice(0, 10))
        completeEndDate && (queryParams.complete_gte = completeEndDate.toISOString().slice(0, 10))

        dispatch(getTasks(queryParams))
    }

    return (
        <>
            {isShowBurger && <IoFilter onClick={()=>{setIsShowFilter(true)}} size='2rem' className={styles.burger}/>}
            {isShowFilter &&<div className={styles.wrapper}></div>}
            <div className={`${styles.headerLeft} ${isShowFilter && styles.showFilter}`}>
                {isShowBurger && <ImCross onClick={()=>{setIsShowFilter(false)}} size='2rem' className={styles.cross}/>}
                <Search searchValue={searchValue} setSearchValue={setSearchValue} />
                <DateRange
                    startDate={createStartDate}
                    setStartDate={setCreateStartDate}
                    endDate={createEndDate}
                    setEndDate={setCreateEndDate}
                    title='Create'
                />
                <DateRange
                    startDate={completeStartDate}
                    setStartDate={setCompleteStartDate}
                    endDate={completeEndDate}
                    setEndDate={setCompleteEndDate}
                    title='Complete'
                />
                <Dropdown
                    options={statusOptions}
                    title='Filter'
                    selected={status}
                    setSelected={setStatus}
                    Icon={FaFilter}
                />
                <Dropdown
                    options={sortOptions}
                    title='Sort'
                    selected={sort}
                    setSelected={setSort}
                    Icon={FaSortAmountDownAlt}
                />
                <button
                    onClick={()=>{
                        handleSearch()
                        setIsShowFilter(false)
                    }}
                    className={styles.searchBtn}>Search
            </button>
            </div>
        </>
    )
}

export default SearchFilterAndSortButtons

