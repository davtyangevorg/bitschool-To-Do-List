import React, { useContext } from 'react'

import { NavLink } from 'react-router-dom'

import styles from './header.module.scss'
import { MdAddCircle } from 'react-icons/all'

import { AddTaskModalContext, SelectedTasksIdsLengthContext } from '../../context.js'

const Header = () => {

    const { setIsShowAddTaskFormModal } = useContext(AddTaskModalContext)
    const { selectedTasksIdsLength } = useContext(SelectedTasksIdsLengthContext)

    return (
        <div className={styles.header}>
            <div className={styles.header_top}>
                <div>header top</div>
                <div>
                    <button
                        onClick={() => { setIsShowAddTaskFormModal(true) }}
                        className={styles.addTaskBtn}
                        disabled={!!selectedTasksIdsLength}
                    >Add New Task
                    <MdAddCircle />
                    </button>
                </div>
            </div>
            <div className={styles.header_manu}>
                <NavLink activeClassName={styles.active} className={styles.navlink} to='/home'>Home</NavLink>
                <NavLink activeClassName={styles.active} className={styles.navlink} to='/about'>About</NavLink>
                <NavLink activeClassName={styles.active} className={styles.navlink} to='/contact'>Contact</NavLink>
            </div>
        </div >
    )
}

export default Header
