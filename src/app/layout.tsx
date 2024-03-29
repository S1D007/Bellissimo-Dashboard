import type { Metadata } from 'next'
import './globals.css'
import { Provider } from './Provider'


export const metadata: Metadata = {
  title: 'bellismo',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body>
        <Provider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <main className='w-full max-w-[100rem] mx-auto h-[100vh] flex flex-col'> */}
          {children}
          {/* </main> */}
        </Provider>
      </body>
    </html>
  )
}
