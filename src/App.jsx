import NasaProvider from './context/NasaProvider'
import DataSubstrate from './components/DataSubstrate'
import MainSubstrate from './components/MainSubstrate'

function App() {
  return (
    <NasaProvider>
      <MainSubstrate />
      <DataSubstrate />
    </NasaProvider>
  )
}

export default App
