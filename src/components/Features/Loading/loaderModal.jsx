import React from 'react'

import styles from './loaderModal.module.scss'

const LoaderModal = () => {
    return (
        <div className={styles.modal}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default LoaderModal
