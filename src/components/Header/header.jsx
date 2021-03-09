import React, { useContext } from 'react'

import {useDispatch} from 'react-redux'

import { NavLink } from 'react-router-dom'

import styles from './header.module.scss'
import { MdAddCircle } from 'react-icons/all'

import {setIsShowAddTaskFormModalAction} from '../../redux/toDo-reducer.js'
import { SelectedTasksIdsLengthContext, IsShowAddNewTaskButtonContext } from '../../context.js'

const Header = () => {

    const { selectedTasksIdsLength } = useContext(SelectedTasksIdsLengthContext)
    const { isShowAddNewTaskButton } = useContext(IsShowAddNewTaskButtonContext)

    const dispatch = useDispatch()
    
    return (
        <div className={styles.header}>
            <div className={styles.header_top}>
                <div className={styles.header_top_left}>header top</div>
                {isShowAddNewTaskButton && <div>
                    <button
                        onClick={() => { dispatch(setIsShowAddTaskFormModalAction(true)) }}
                        className={styles.addTaskBtn}
                        disabled={!!selectedTasksIdsLength}
                    >Add New Task
                    <MdAddCircle />
                    </button>
                </div>}
            </div>
            <div className={styles.header_manu}>
                <NavLink exact activeClassName={styles.active} className={styles.navlink} to='/'>Home</NavLink>
                <NavLink exact activeClassName={styles.active} className={styles.navlink} to='/about'>About</NavLink>
                <NavLink exact activeClassName={styles.active} className={styles.navlink} to='/contact'>Contact</NavLink>
            </div>
        </div >
    )
}

export default Header
