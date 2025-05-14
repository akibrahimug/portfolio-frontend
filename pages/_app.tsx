import '../styles/globals.css'
import { Provider } from '../components/Context'
import { StyledEngineProvider } from '@mui/material'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </StyledEngineProvider>
  )
}

export default MyApp
