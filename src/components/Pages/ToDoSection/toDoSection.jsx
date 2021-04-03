import React, { useState, useEffect, useContext } from 'react'

import styles from './toDoSection.module.scss'
import { Container, Row } from 'react-bootstrap'

import { IoGrid, FaListUl } from 'react-icons/all'

import ToDoListFoundation from './ToDoListFoundation/toDoListFoundation.jsx'
import SearchFilterAndSortButtons from './SearchFilterAndSortButtons/searchFilterAndSortButtons.jsx'

import { ListOrGridSwitchContext, IsShowAddNewTaskButtonContext } from '../../../context.js'


const ToDoSection = () => {

    const [switchName, setSwitchName] = useState('grid')
    const [isActiceListBtn, setIsActiveListBtn] = useState(true)
    const [isActiceGridBtn, setIsActiveGridBtn] = useState(false)

    const { setIsShowAddNewTaskButton } = useContext(IsShowAddNewTaskButtonContext)

    useEffect(() => {
        setIsShowAddNewTaskButton(true)
        return () => {
            setIsShowAddNewTaskButton(false)
        }
    }, [setIsShowAddNewTaskButton])

    const handleActive = (type) => {
        if (type === 'grid') {
            setSwitchName('grid')
            setIsActiveListBtn(true)
            setIsActiveGridBtn(false)
        } else {
            setSwitchName('list')
            setIsActiveGridBtn(true)
            setIsActiveListBtn(false)
        }
    }

    return (
        <>
            <Container fluid style={{ padding: '25px 45px' }}>
                <Row style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                    <div className={styles.tasksStylesBtns}style={{marginRight:'100px'}}>
                        <div
                            className={styles.btnDiv}
                            onClick={() => { handleActive('grid') }}
                        >
                            <FaListUl className={isActiceListBtn && styles.svgActive} />
                            <button className={`${styles.listBtn} ${isActiceListBtn && styles.buttonActive}`}>Grid</button>
                        </div>
                        <div
                            className={styles.btnDiv}
                            onClick={() => { handleActive('list') }}
                        >
                            <IoGrid className={isActiceGridBtn && styles.svgActive} />
                            <button className={`${styles.gridBtn} ${isActiceGridBtn && styles.buttonActive}`}>List</button>
                        </div>
                    </div>
                    <SearchFilterAndSortButtons />
                </Row>
                <ListOrGridSwitchContext.Provider value={switchName}>
                    <ToDoListFoundation />
                </ListOrGridSwitchContext.Provider>
            </Container>
        </>
    )
}
export default ToDoSection