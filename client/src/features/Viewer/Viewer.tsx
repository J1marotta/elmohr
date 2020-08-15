import React, { ReactElement } from 'react'
import styles from './Viewer.module.css'
import { getUsers, getStatus } from '../Meta/MetaSlice'
import { useSelector } from 'react-redux'

export const Viewer = (): ReactElement => {
    const status = useSelector(getStatus)
    const userData = useSelector(getUsers)

    if (status === 'error') {
        return <div className={styles.error}> something went wrong sorry </div>
    }
    if (status === 'loading') {
        return <div data-testid="loader" className={styles.loader} />
    }
    if (status === 'ready') {
        return (
            <div className={styles.view}>
                {userData.map((user) => (
                    <div className={styles.row} key={user.id}>
                        <span> name: {user.name} </span>
                        <span> id: {user.id}</span>
                        <span> location: {user.location || 'not listed'}</span>
                    </div>
                ))}
            </div>
        )
    }

    return <div> Welcome </div>
}
