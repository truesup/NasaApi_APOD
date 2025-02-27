import { useContext, useEffect } from 'react'
import styles from './MainSubstrate.module.css'
import { NasaContext } from '../context/NasaContext'
import { toast } from 'react-toastify'

const MainSubstrate = ({ className }) => {
  const {
    chosenDate,
    handleInputChange,
    getDataFromApi,
    isLoading,
    setIsLoading,
  } = useContext(NasaContext)

  const handleGetData = async () => {
    if (!chosenDate) {
      toast('Enter a date :)')
      return
    }
    setIsLoading(true)
    await getDataFromApi()
    setIsLoading(false)
  }

  return (
    <div className={`${styles.mainSubstrate} ${className}`}>
      <p className={styles.mainText}>
        Right now, this app can only find a space photo/video taken on a
        specific date and display it for you.
        <br />
        Just choose a date and see what the universe looked like back then!
      </p>
      <input
        className={styles.dateInput}
        type="date"
        value={chosenDate ?? ''}
        onChange={handleInputChange}
      />
      <button
        className={styles.mainButton}
        type="button"
        onClick={handleGetData}
        disabled={isLoading}>
        {isLoading ? 'Loading...' : "Let's see!"}
      </button>
    </div>
  )
}

export default MainSubstrate
