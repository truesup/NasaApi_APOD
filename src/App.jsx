import { useContext } from 'react'
import { NasaContext } from './context/NasaContext'
import NasaProvider from './context/NasaProvider'
import DataSubstrate from './components/DataSubstrate'
import MainSubstrate from './components/MainSubstrate'

function AppContent() {
  const { isDataShown } = useContext(NasaContext)
  return isDataShown ? <DataSubstrate /> : <MainSubstrate />
}

function App() {
  return (
    <NasaProvider>
      <AppContent />
    </NasaProvider>
  )
}

export default App
