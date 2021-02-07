import React from 'react'
import quotationsData from '../../datas/quotations.json'

import { Container, Row, Col } from 'react-bootstrap'
import styles from './footer.module.scss'

const Footer = () => {
    
    return (
        <div className={styles.footer}>
            <Container fluid style={{ padding: '2px 45px' }}>
                <Row>
                    <Col>
                        <div className={styles.textDiv}>
                            <p>"{getRandomQuotation(quotationsData).quotation}"</p>
                            <h6>- {getRandomQuotation(quotationsData).people}</h6>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const getRandomQuotation = quotations => quotations[Math.floor(Math.random() * quotations.length)]

export default Footer
