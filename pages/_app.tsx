import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '@/components/AppContext'
import { StyledEngineProvider } from '@mui/material'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

// dynamically load AuthProvider only on client, only when needed
const AuthProvider = dynamic(
  () => import('@/components/AuthProvider').then((m) => m.AuthProvider),
  { ssr: false },
)

function MyApp({ Component, pageProps }: AppProps) {
  const path = usePathname() || ''
  const protectedRoute = path.startsWith('/dashboard') || path.startsWith('/restapi')

  return (
    <StyledEngineProvider injectFirst>
      <AppProvider>
        {protectedRoute ? (
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </AppProvider>
    </StyledEngineProvider>
  )
}

export default MyApp
