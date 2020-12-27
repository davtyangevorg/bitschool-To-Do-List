import React from 'react'
import style from './leftSidbar.module.scss'

import logo from '../../images/logo.png'
import christmasTree from '../../images/gifs/christmasTree.gif'

const LeftSidbar = () => {
    return (
        <div className={style.leftSidbar}>
            <div className={style.leftSidbar_header}>
                <img style={{ height: '27px', marginRight: '35px' }} src={logo} alt='logo'></img>
                <img style={{ height: '40px' }} src={christmasTree} alt='christmas tree'></img>
            </div>
            <div style={{ height: '89vh' }}>
                Workspaces
            </div>
            <div className={style.leftSidbar_footer}>
                To Do List © 2020
            </div>
        </div>
    )
}

export default LeftSidbar
