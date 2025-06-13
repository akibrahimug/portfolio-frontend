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

/**
 * Custom Next.js App component that sets up global providers and conditionally enforces authentication for protected routes.
 *
 * Wraps all pages with Material UI's {@link StyledEngineProvider} and the application context provider. For routes starting with `/dashboard` or `/restapi`, the page is additionally wrapped with an authentication provider to require user authentication.
 *
 * @param Component - The active page component to render.
 * @param pageProps - Props for the active page component.
 */
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
