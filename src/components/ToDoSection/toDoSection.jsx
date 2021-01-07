import React from 'react'

import styles from './toDoSection.module.scss'
import { Container, Row } from 'react-bootstrap'

import ToDoListFoundation from './ToDoListFoundation/toDoList.jsx'


const ToDoSection = () => {

    return (
        <>
            <Container fluid style={{ padding: '25px 45px' }}>
                <Row>
                    <div className={styles.tasksStylesBtns}>
                        <button className={styles.firstBtn}>Grid</button>
                        <button className={styles.secondBtn}>List</button>
                    </div>
                </Row>
                <ToDoListFoundation />
            </Container>
        </>
    )
}
export default ToDoSection
