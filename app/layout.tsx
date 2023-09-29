import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOlny'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AirbnbCone',
  description: 'Airbnb clone project.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
