import React, { useState } from 'react'
import style from './home.module.scss'

import ToDoSection from '../ToDoSection/toDoSection.jsx'
import Footer from '../Footer/footer.jsx'
import Header from '../Header/header.jsx'

import { AddTaskModalContext, SelectedTasksIdsLengthContext } from '../../context.js'

const Home = () => {
    const [isShowAddTaskFormModal, setIsShowAddTaskFormModal] = useState(false)
    const [selectedTasksIdsLength, setSelectedTasksIdsLength] = useState(0)
    
    return (
        <div className={style.home}>
            <SelectedTasksIdsLengthContext.Provider
                value={{ selectedTasksIdsLength: selectedTasksIdsLength, setSelectedTasksIdsLength: setSelectedTasksIdsLength }}
            >
                <AddTaskModalContext.Provider
                    value={{ isShowAddTaskFormModal: isShowAddTaskFormModal, setIsShowAddTaskFormModal: setIsShowAddTaskFormModal }}
                >
                    <Header />
                    <div className={style.home_section}>
                        <ToDoSection />
                    </div>
                </AddTaskModalContext.Provider>
            </SelectedTasksIdsLengthContext.Provider>
            <Footer />
        </div>
    )
}

export default Home