import { useContext } from 'react'
import { NasaContext } from '../context/NasaContext'
import { months } from '../utils/monthsObject.js'
import styles from './DataSubstrate.module.css'

const DataSubstrate = () => {
  const { nasaData } = useContext(NasaContext)

  if (!nasaData) {
    return <></>
  }

  const formattedDate = nasaData?.date?.split('-') ?? []
  const month = months[formattedDate[1]?.padStart(2, '0')] || 'Unknown'

  return (
    <div className={styles.dataSubstrate}>
      <p className={styles.dataTitle}>{nasaData.title}</p>
      <p className={styles.dataChosenDate}>
        Day: <span className={styles.dataSpan}>{formattedDate[2]}</span> |
        Month: <span className={styles.dataSpan}>{month}</span> | Year:{' '}
        <span className={styles.dataSpan}>{formattedDate[0]}</span>
      </p>
      {nasaData.media_type === 'image' && nasaData.url ? (
        <img
          className={styles.media}
          src={nasaData.url}
          alt="Nasa image from chosen date"
        />
      ) : nasaData.media_type === 'video' && nasaData.url ? (
        <iframe
          width="560"
          height="315"
          src={nasaData.url}
          title={nasaData.title}
          frameBorder="0"
          allowFullScreen></iframe>
      ) : (
        <p className={styles.dataError}>Media not available</p>
      )}
    </div>
  )
}

export default DataSubstrate
