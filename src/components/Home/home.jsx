import React from 'react'
import style from './home.module.scss'

import ToDoListFoundation from '../ToDoListFoundation/toDoList.jsx'

const Home = () => {
    return (
        <div className={style.home}>
            <div className={style.home_header}>header</div>
            <div className={style.home_section}>
                <div className={style.tasksStylesBtns}>
                    <button className={style.firstBtn}>Grid</button>
                    <button className={style.secondBtn}>List</button>
                </div>
                <ToDoListFoundation />
            </div>
            <div className={style.home_footer}>footer</div>
        </div>
    )
}

export default Home