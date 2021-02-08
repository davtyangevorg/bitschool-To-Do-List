import React,{useState,useEffect} from 'react'
import quotationsData from '../../datas/quotations.json'

import styles from './footer.module.scss'

const Footer = () => {

    const [isShowText,setIsShowText]=useState(true)

    useEffect(() => {
        function media() {
            if(window.innerWidth<=830) return setIsShowText(false)
            return setIsShowText(true)
        }
        window.addEventListener('resize',media)
        return () => {
            window.removeEventListener('resize',media)
        }
    })

    return (
        <div className={styles.footer}>
            {isShowText && <div className={styles.textDiv}>
                <p>"{getRandomQuotation(quotationsData).quotation}"</p>
                <h6>- {getRandomQuotation(quotationsData).people}</h6>
            </div>}
        </div>
    )
}

const getRandomQuotation = quotations => quotations[Math.floor(Math.random() * quotations.length)]

export default Footer
