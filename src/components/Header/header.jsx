import React, { useContext } from 'react'

import styles from './header.module.scss'
import { MdAddCircle } from 'react-icons/all'

import { AddTaskModalContext, SelectedTasksIdsLengthContext } from '../../context.js'

const Header = () => {

    const { setIsShowAddTaskFormModal } = useContext(AddTaskModalContext)
    const { selectedTasksIdsLength } = useContext(SelectedTasksIdsLengthContext)
    
    return (
        <div className={styles.header}>
            <div>header</div>
            <div>
                {!selectedTasksIdsLength &&
                    <div onClick={() => { setIsShowAddTaskFormModal(true) }} className={styles.addTaskBtn}>
                        <button >Add New Task</button>
                        <MdAddCircle />
                    </div>}
            </div>
        </div >
    )
}

export default Header
