import '../styles/globals.css'
import { Provider } from '../components/Context'
import { StyledEngineProvider } from '@mui/material'

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <Provider>
        <Component {...pageProps}/>
      </Provider>
    </StyledEngineProvider>
  )
}

export default MyApp
