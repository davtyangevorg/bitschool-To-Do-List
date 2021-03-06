import React, {  memo } from 'react'

import styles from './search.module.scss'
import { FaSearch } from 'react-icons/fa'

const Search = memo(({ searchValue, setSearchValue }) => {
    
    const handleChange = (event) => {
        setSearchValue(event.target.value)
    }

    return (
        <div className={styles.searchDiv}>
            <input
                placeholder='Search'
                onChange={handleChange}
            />
            <div className={styles.logo}>
                <FaSearch />
            </div>
        </div>
    )
})

export default Search
