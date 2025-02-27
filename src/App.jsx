import { useContext } from 'react'
import { NasaContext } from './context/NasaContext'
import NasaProvider from './context/NasaProvider'
import DataSubstrate from './components/DataSubstrate'
import MainSubstrate from './components/MainSubstrate'
import styles from './App.module.css'

function AppContent() {
  const { isDataShown } = useContext(NasaContext)
  return isDataShown ? (
    <DataSubstrate className={isDataShown ? styles.shown : styles.hidden} />
  ) : (
    <MainSubstrate className={isDataShown ? styles.hidden : styles.shown} />
  )
}

function App() {
  return (
    <NasaProvider>
      <AppContent />
    </NasaProvider>
  )
}

export default App
