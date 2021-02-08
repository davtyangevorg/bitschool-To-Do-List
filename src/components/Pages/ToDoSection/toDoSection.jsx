import React, { useState } from 'react'

import styles from './toDoSection.module.scss'
import { Container, Row } from 'react-bootstrap'

import { IoGrid, FaListUl } from 'react-icons/all'

import ToDoListFoundation from './ToDoListFoundation/toDoListFoundation.jsx'

import { ListOrGridSwitchContext } from '../../../context.js'

const ToDoSection = () => {

    const [switchName, setSwitchName] = useState('list')
    const [isActiceListBtn, setIsActiveListBtn] = useState(true)
    const [isActiceGridBtn, setIsActiveGridBtn] = useState(false)



    const handleActive = (type) => {
        if (type === 'list') {
            setSwitchName('list')
            setIsActiveListBtn(true)
            setIsActiveGridBtn(false)
        } else {
            setSwitchName('grid')
            setIsActiveGridBtn(true)
            setIsActiveListBtn(false)
        }
    }

    return (
        <>
            <Container fluid style={{ padding: '25px 45px' }}>
                <Row>
                    <div className={styles.tasksStylesBtns}>
                        <div
                            className={styles.btnDiv}
                            onClick={() => { handleActive('list') }}
                        >
                            <FaListUl className={isActiceListBtn && styles.svgActive} />
                            <button className={`${styles.listBtn} ${isActiceListBtn && styles.buttonActive}`}>List</button>
                        </div>
                        <div
                            className={styles.btnDiv}
                            onClick={() => { handleActive('grid') }}
                        >
                            <IoGrid className={isActiceGridBtn && styles.svgActive} />
                            <button className={`${styles.gridBtn} ${isActiceGridBtn && styles.buttonActive}`}>Grid</button>
                        </div>
                    </div>
                </Row>
                <ListOrGridSwitchContext.Provider value={switchName}>
                    <ToDoListFoundation />
                </ListOrGridSwitchContext.Provider>
            </Container>
        </>
    )
}
export default ToDoSection