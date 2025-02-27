import MainSubstrate from './components/MainSubstrate'
import NasaProvider from './context/NasaProvider'

function App() {
  return (
    <NasaProvider>
      <MainSubstrate />
    </NasaProvider>
  )
}

export default App
