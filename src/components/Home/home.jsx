import React from 'react'
import style from './home.module.scss'

import ToDoSection from '../ToDoSection/toDoSection.jsx'
import Footer from '../Footer/footer.jsx'

const Home = () => {
    return (
        <div className={style.home}>
            <div className={style.home_header}>header</div>
            <div className={style.home_section}>
                <ToDoSection />
            </div>
            <Footer />
        </div>
    )
}

export default Home