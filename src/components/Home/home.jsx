import React, { useState } from 'react'
import style from './home.module.scss'

import { Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Footer from '../Footer/footer.jsx'
import Header from '../Header/header.jsx'

import SingleTask from '../Pages/SingleTask/singleTask.jsx'

import ToDoSection from '../Pages/ToDoSection/toDoSection.jsx'
import About from '../Pages/About/about.jsx'
import Contact from '../Pages/Contact/contact.jsx'
import NotFound from '../Pages/NotFound/notFound.jsx'
import SignUp from '../Pages/SignUp/signUp.jsx'
import SignIn from '../Pages/SignIn/signIn.jsx'

import { SelectedTasksIdsLengthContext, IsShowAddNewTaskButtonContext } from '../../context.js'

const Home = () => {
    const [selectedTasksIdsLength, setSelectedTasksIdsLength] = useState(0)
    const [isShowAddNewTaskButton, setIsShowAddNewTaskButton] = useState(false)

    return (
        <div className={style.home}>
            <SelectedTasksIdsLengthContext.Provider
                value={{ selectedTasksIdsLength: selectedTasksIdsLength, setSelectedTasksIdsLength: setSelectedTasksIdsLength }}
            >
                <IsShowAddNewTaskButtonContext.Provider
                    value={{ isShowAddNewTaskButton: isShowAddNewTaskButton, setIsShowAddNewTaskButton: setIsShowAddNewTaskButton }}
                >
                    <Header />
                    <div className={style.home_section}>
                        <Switch>
                            <AuthRoute
                                path='/'
                                component={ToDoSection}
                                type='private'
                                exact
                            />
                            <AuthRoute
                                path='/home'
                                component={ToDoSection}
                                type='private'
                                exact
                            />
                            <AuthRoute
                                path='/about'
                                component={About}
                                exact
                            />
                            <AuthRoute
                                path='/contact'
                                component={Contact}
                                exact
                            />
                            <AuthRoute
                                path='/sign-up'
                                component={SignUp}
                                type='public'
                                exact
                            />
                            <AuthRoute
                                path='/sign-in'
                                component={SignIn}
                                type='public'
                                exact
                            />
                            <AuthRoute
                                path='/task/:taskId'
                                component={SingleTask}
                                type='private'
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
            </SelectedTasksIdsLengthContext.Provider>
            <Footer />
        </div>
    )
}

export default Home

const AuthRoute = ({ path, component: Component, type }) => {

    const isAuth = useSelector(state => state.toDoReducer.isAuth)

    return (
        <Route
            path={path}
            render={props => {
                if (isAuth && type === 'public') return <Redirect to='/' />
                if (!isAuth && type === 'private') return <Redirect to='/sign-in' />
                return <Component {...props}/>
            }}
        />
    )
}