import { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_KEY } from './utils/api_key.js'

function App() {
  const [date, setDate] = useState('')
  const [nasaData, setNasaData] = useState(null)
  const [customError, setCustomError] = useState(null)

  const getApiData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
      )
      setNasaData(data)
      setCustomError(null)
    } catch (error) {
      setCustomError(error.message)
      setNasaData(null)
      toast('An error occured, sorry :(')
    }
  }

  const handleDateChange = e => setDate(e.target.value)
  const handleGetData = () => {
    getApiData()
  }

  useEffect(() => {
    console.log(nasaData)
  }, [nasaData])

  return (
    <div className="mainSubstrate">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        toastStyle={{
          fontFamily: 'M PLUS Code Latin',
          fontSize: '18px',
          backgroundColor: 'var(--color-light)',
          color: 'var(--color-blue)',
          borderRadius: '8px',
        }}
      />

      <p className="mainText">
        Right now, this app can only find a space photo/video taken on a
        specific date and display it for you.
        <br />
        Just choose a date and see what the universe looked like back then!
      </p>

      <input
        className="dateInput"
        type="date"
        value={date}
        onChange={handleDateChange}
      />
      <button className="mainButton" type="button" onClick={handleGetData}>
        Let's see!
      </button>
    </div>
  )
}

export default App
