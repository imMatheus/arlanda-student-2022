import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
    const [timeNow, setTimeNow] = useState(new Date())
    const [birthday] = useState(new Date('03 June 2022'))
    const [isZero, setIsZero] = useState(false)
    const [days, setDays] = useState<number | string>(0)
    const [timeInterval, setTimeInterval] = useState<any>()
    const [hours, setHours] = useState<number | string>(0)
    const [minutes, setMinutes] = useState<number | string>(0)
    const [seconds, setSeconds] = useState<number | string>(0)
    const iconsArray = useRef([...Array(70)].map(() => Math.random()))

    useEffect(() => {
        const _interval = setInterval(() => {
            setTimeNow(new Date())
        }, 1000)
        setTimeInterval(_interval)
        return () => {
            clearInterval(timeInterval)
        }
    }, [])

    useEffect(() => {
        const diff = Math.floor((birthday.getTime() - timeNow.getTime()) / 1000)
        if (diff < 1) {
            setSeconds('00')
            setMinutes('00')
            setHours('00')
            setDays('00')
            setIsZero(true)
            clearInterval(timeInterval)
        } else {
            const _days = Math.floor(diff / (60 * 60 * 24))
            const _hours = Math.floor((diff / (60 * 60)) % 24)
            const divisor_for_minutes = diff % (60 * 60)
            const _minutes = Math.floor(divisor_for_minutes / 60)
            const divisor_for_seconds = divisor_for_minutes % 60
            const _seconds = Math.ceil(divisor_for_seconds)

            setSeconds(_seconds < 10 ? '0' + _seconds : _seconds)
            setMinutes(_minutes < 10 ? '0' + _minutes : _minutes)
            setHours(_hours < 10 ? '0' + _hours : _hours)
            setDays(_days < 10 ? '0' + _days : _days)
        }
    }, [timeNow, birthday, timeInterval])

    return (
        <div className={styles.container}>
            <Head>
                <title>
                    {isZero
                        ? 'CONGRATULATIONS????????????'
                        : `${days}:${hours}:${minutes}:${seconds}`}
                </title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            {isZero &&
                iconsArray.current.map((num, index) => {
                    const icons = ['????', '????', '????']
                    return (
                        <div className={styles.icon} key={index}>
                            {icons[Math.floor(num * icons.length)]}
                        </div>
                    )
                })}
            <div className={styles.centered}>
                <div className={styles.box}>{days}</div>:
                <div className={styles.box}>{hours}</div>:
                <div className={styles.box}>{minutes}</div>:
                <div className={styles.box}>{seconds}</div>
            </div>
        </div>
    )
}

export default Home
