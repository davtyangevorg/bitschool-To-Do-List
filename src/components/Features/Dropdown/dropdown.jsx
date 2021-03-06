import React, { useState, useRef, useEffect, memo } from 'react'

import styles from './dropdown.module.scss'

import {textTruncate} from '../../../utils.js'

const Dropdown = memo(({ options, title, selected, setSelected, Icon }) => {
    
    const [isOpenList, setIsOpenList] = useState(false)
    const wrapperRef = useRef()

    const handleSelect = (option) => {
        setSelected(option)  
    }

    useOutsideAlerter(wrapperRef, setIsOpenList)

    return (
        <div className={styles.dropdown} onClick={() => { setIsOpenList(!isOpenList) }} ref={wrapperRef}>
            <div className={styles.buttonDiv}>
                <button>
                    {title} By : {textTruncate(selected.label,8)}
                </button>
                <Icon />
            </div>
            {isOpenList && <div className={styles.optionsList}>
                {
                    options.map((option, index) => {
                        return (
                            <div className={`${styles.option} ${selected.value === option.value ? styles.optionAfter : ''}`}
                                key={index}
                                onClick={() => handleSelect(option)}
                            >
                                {option.label}
                            </div>
                        )
                    })
                }
            </div>}
        </div>
    )
}
)

export default Dropdown

function useOutsideAlerter(ref, set) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                set(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, set]);
}