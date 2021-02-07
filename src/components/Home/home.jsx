import React, { useState } from 'react'
import style from './home.module.scss'

import { Redirect, Route, Switch } from 'react-router-dom'

import Footer from '../Footer/footer.jsx'
import Header from '../Header/header.jsx'

import SingleTask from '../Pages/SingleTask/singleTask.jsx'

import ToDoSection from '../Pages/ToDoSection/toDoSection.jsx'
import About from '../Pages/About/about.jsx'
import Contact from '../Pages/Contact/contact.jsx'
import NotFound from '../Pages/NotFound/notFound.jsx'

import { AddTaskModalContext, SelectedTasksIdsLengthContext, IsShowAddNewTaskButtonContext } from '../../context.js'

const Home = () => {
    const [isShowAddTaskFormModal, setIsShowAddTaskFormModal] = useState(false)
    const [selectedTasksIdsLength, setSelectedTasksIdsLength] = useState(0)
    const [isShowAddNewTaskButton, setIsShowAddNewTaskButton] = useState(true)

    return (
        <div className={style.home}>
            <SelectedTasksIdsLengthContext.Provider
                value={{ selectedTasksIdsLength: selectedTasksIdsLength, setSelectedTasksIdsLength: setSelectedTasksIdsLength }}
            >
                <AddTaskModalContext.Provider
                    value={{ isShowAddTaskFormModal: isShowAddTaskFormModal, setIsShowAddTaskFormModal: setIsShowAddTaskFormModal }}
                >
                    <IsShowAddNewTaskButtonContext.Provider
                        value={{ isShowAddNewTaskButton: isShowAddNewTaskButton, setIsShowAddNewTaskButton:                  setIsShowAddNewTaskButton }}
                    >
                        <Header />
                        <div className={style.home_section}>
                            <Switch>
                                <Route
                                    path='/'
                                    component={ToDoSection}
                                    exact
                                />
                                <Route
                                    path='/home'
                                    component={ToDoSection}
                                    exact
                                />
                                <Route
                                    path='/about'
                                    component={About}
                                    exact
                                />
                                <Route
                                    path='/contact'
                                    component={Contact}
                                    exact
                                />
                                <Route
                                    path='/task/:taskId'
                                    component={SingleTask}
                                    exact
                                />
                                <Route
                                    path='/not-found'
                                    component={NotFound}
                                    exact
                                />
                                <Redirect
                                    to='/not-found'
                                />
                            </Switch>
                        </div>
                    </IsShowAddNewTaskButtonContext.Provider>
                </AddTaskModalContext.Provider>
            </SelectedTasksIdsLengthContext.Provider>
            <Footer />
        </div>
    )
}

export default Home