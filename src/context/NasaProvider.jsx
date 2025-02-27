import axios from 'axios'
import { useState } from 'react'
import { NasaContext } from './NasaContext'
import { API_KEY } from '../utils/api_key'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const NasaProvider = ({ children }) => {
  const [chosenDate, setChosenDate] = useState('')
  const [nasaData, setNasaData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = e => setChosenDate(e.target.value)

  const getDataFromApi = async () => {
    console.log('fetching started')
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${chosenDate}`
      )
      setNasaData(data)
    } catch (error) {
      console.log('Error:', error)
      toast.error(error.response?.data?.msg || 'Failed to fetch, sorry :(')
    } finally {
      console.log('fetching finished')
      setIsLoading(false)
    }
  }

  return (
    <NasaContext.Provider
      value={{
        chosenDate,
        setChosenDate,
        handleInputChange,
        nasaData,
        getDataFromApi,
        isLoading,
        setIsLoading,
      }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        theme="light"
        toastStyle={{
          fontFamily: 'M PLUS Code Latin',
          fontSize: '18px',
          backgroundColor: 'var(--color-light)',
          color: 'var(--color-blue)',
          borderRadius: '8px',
        }}
      />
      {children}
    </NasaContext.Provider>
  )
}

export default NasaProvider
