import React, { useContext, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom'

import Logo from '../../images/logo.png'

import styles from './header.module.scss'
import { MdAddCircle } from 'react-icons/all'

import { logout } from '../../utils.js'

import { setIsShowAddTaskFormModalAction, getUserInfo } from '../../redux/toDo-reducer.js'
import { SelectedTasksIdsLengthContext, IsShowAddNewTaskButtonContext } from '../../context.js'

const Header = () => {

    const { selectedTasksIdsLength } = useContext(SelectedTasksIdsLengthContext)
    const { isShowAddNewTaskButton } = useContext(IsShowAddNewTaskButtonContext)

    const isAuth = useSelector(state => state.toDoReducer.isAuth)
    const userInfo = useSelector(state => state.toDoReducer.userInfo)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])

    const signOut = (event) => {
        event.preventDefault()
        logout()
    }

    return (
        <div className={styles.header}>
            <div className={styles.header_top}>
                <NavLink to='/'><img src={Logo} alt='logo' className={styles.logo} /></NavLink>
                <div className={styles.header_top_rigth}>
                    <span>{userInfo && userInfo.name + ' ' + userInfo.surname}</span>
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
            </div>
            <div className={styles.header_manu}>
                <div className={styles.header_manu_left}>
                    {isAuth && <NavLink exact activeClassName={styles.active} className={styles.navlink} to='/'>Home</NavLink>}
                    <NavLink exact activeClassName={styles.active} className={styles.navlink} to='/about'>About</NavLink>
                    <NavLink exact activeClassName={styles.active} className={styles.navlink} to='/contact'>Contact</NavLink>
                </div>
                <div className={styles.header_manu_rigth}>
                    {isAuth
                        ? <NavLink onClick={signOut} exact activeClassName={styles.active} className={styles.navlink} to='/sign-up'>Sign Out</NavLink>
                        : <>
                            <NavLink exact activeClassName={styles.active} className={styles.navlink} to='/sign-up'>Sign Up</NavLink>
                            <NavLink exact activeClassName={styles.active} className={styles.navlink} to='/sign-in'>Sign In</NavLink>
                        </>
                    }
                </div>
            </div>
        </div >
    )
}

export default Header
