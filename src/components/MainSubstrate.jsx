import { useContext, useEffect } from 'react'
import styles from './MainSubstrate.module.css'
import { NasaContext } from '../context/NasaContext'
import { toast } from 'react-toastify'

const MainSubstrate = () => {
  const {
    chosenDate,
    handleInputChange,
    nasaData,
    getDataFromApi,
    isLoading,
    setIsLoading,
  } = useContext(NasaContext)

  const handleGetData = async () => {
    console.log('Button clicked!')
    if (!chosenDate) {
      toast('Enter a date :)')
      return
    }
    setIsLoading(true)
    await getDataFromApi()
    setIsLoading(false)
  }

  useEffect(() => {
    console.log(nasaData)
  }, [nasaData])

  return (
    <div className={styles.mainSubstrate}>
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
        // disabled={!chosenDate || isLoading}
      >
        {isLoading ? 'Loading...' : "Let's see!"}
      </button>
    </div>
  )
}

export default MainSubstrate
