'use client'
import React, { createContext, ReactNode } from 'react'
import GoogleUpload from '@/pages/api/GoogleUpload'
import NoAuth from '@/pages/api/NoAuthRoutes'

interface AppContextValue {
  noAuth: NoAuth
  googleUpload: GoogleUpload
  // you can still export your API helpers here if you want,
  // but they won’t pull in axios/jwt on public pages.
}

export const AppContext = createContext<AppContextValue>({
  noAuth: new NoAuth(),
  googleUpload: new GoogleUpload(),
})

/**
 * Provides API helper instances to descendant React components via context.
 *
 * Wraps child components with an {@link AppContext.Provider} that supplies new instances of {@link NoAuth} and {@link GoogleUpload}, making them accessible throughout the component tree.
 *
 * @param children - The React nodes to render within the provider.
 */
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppContext.Provider
      value={{
        noAuth: new NoAuth(),
        googleUpload: new GoogleUpload(),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
