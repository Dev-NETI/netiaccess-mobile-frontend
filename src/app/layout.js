import '@/app/global.css'
import React from 'react'

export const metadata = {
    title: 'NETI-OEX Mobile',
}
const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    )
}

export default RootLayout
