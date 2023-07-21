import './globals.css'
import { Inter } from 'next/font/google'

import BottomTab from './components/common/BottomTab'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '시장가장',
  description: 'Published by 최강맹수뽀삐',
}

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          {children}
          <BottomTab />
        </div>
      </body>
    </html>
  )
}
