import { useContext, useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa6'
import { NasaContext } from '../context/NasaContext'
import { months } from '../utils/monthsObject.js'
import styles from './DataSubstrate.module.css'

const DataSubstrate = ({ className }) => {
  const { nasaData, setIsDataShown, setChosenDate } = useContext(NasaContext)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDescriptionShown, setIsDescriptionShown] = useState(false)

  const handleGoBack = () => {
    setIsDataShown(false)
    setChosenDate('')
  }

  const handleImageClick = () => {
    setIsFullscreen(true)
  }

  const handleDescriptionToggle = () => {
    setIsDescriptionShown(true)
  }

  if (!nasaData) {
    return null
  }

  const formattedDate = nasaData?.date?.split('-') ?? []
  const month = months[formattedDate[1]?.padStart(2, '0')] || 'Unknown'

  return (
    <div className={`${styles.dataSubstrate} ${className}`}>
      <button className={styles.goBackButton} onClick={handleGoBack}>
        <FaAngleLeft />
      </button>
      <p className={styles.dataTitle}>{nasaData.title}</p>
      <p className={styles.dataChosenDate}>
        Day: <span className={styles.dataSpan}>{formattedDate[2]}</span> |
        Month: <span className={styles.dataSpan}>{month}</span> | Year:{' '}
        <span className={styles.dataSpan}>{formattedDate[0]}</span>
      </p>
      {nasaData.media_type === 'image' && nasaData.url ? (
        <>
          <img
            className={`${styles.media} ${styles.photo}`}
            src={nasaData.url}
            alt="Nasa image from chosen date"
            onClick={handleImageClick}
          />
          <p>Click the image to see it fullscreen</p>
        </>
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
      {isFullscreen && (
        <div
          className={styles.fullscreenOverlay}
          onClick={() => setIsFullscreen(false)}>
          <img
            src={nasaData.url}
            alt="Fullscreen view"
            className={styles.fullscreenImage}
          />
        </div>
      )}
      <button
        className={styles.descriptionButton}
        onClick={handleDescriptionToggle}>
        Show description
      </button>
      {isDescriptionShown && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsDescriptionShown(false)}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}>
            <p className={styles.modalText}>{nasaData.explanation}</p>
            <button
              className={styles.closeModalButton}
              onClick={() => setIsDescriptionShown(false)}>
              <FaAngleLeft />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataSubstrate
