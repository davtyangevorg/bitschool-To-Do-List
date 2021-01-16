import React from 'react'

import PropsTypes from 'prop-types'

import styles from './confirm.module.scss'
import { animated, useSpring } from 'react-spring'

import { RiCloseLine } from 'react-icons/all'
import Delete from '../../../images/delete.png'

const Confirm = ({ closeConfirm, deleteConfirm, title, text, isShowConfirm }) => {

    const handleDelete = () => {
        closeConfirm()
        deleteConfirm()
    }

    const onHeaderClick = event => {
        if (event.target === event.currentTarget) {
            closeConfirm()
        }
    }

    const taskBack = useSpring({
        display: isShowConfirm ? 'block' : 'none'
    })
    const taskBackground = useSpring({
        opacity: isShowConfirm ? 1 : 0,
        config: { duration: 200 }
    })
    const confirmInnerAnime = useSpring({
        transform: isShowConfirm ? 'translateY(20%)' : 'translateY(5%)',
        config: { duration: 200 }
    })

    return (
        <animated.div style={taskBack}>
            <animated.div style={taskBackground} onClick={onHeaderClick} className={styles.confirmBackground}>
                <animated.div style={confirmInnerAnime} className={styles.confirmInner}>
                    <div className={styles.confirm_title}>
                        <h3>{title}</h3>
                        <RiCloseLine onClick={closeConfirm} />
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.confirm_text}>
                        <img alt='delete_png' src={Delete}></img>
                        <p>{text}</p>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.confirm_bnts}>
                        <span onClick={closeConfirm}>Cancel</span>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </animated.div>
            </animated.div>
        </animated.div>
    )
}

Confirm.propsTypes = {
    closeConfirm: PropsTypes.func.isRequired,
    deleteConfirm: PropsTypes.func.isRequired,
    title: PropsTypes.string.isRequired,
    text: PropsTypes.string.isRequired,
    isShowConfirm: PropsTypes.bool.isRequired
}

export default Confirm
