import type { Metadata } from 'next'
import '../styles/globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import Sidebar from '../components/layout/sidebar'
import Header from '../components/layout/header'

export const metadata: Metadata = {
    title: 'DocScan Pro',
    description: 'AI Document Scanner SaaS',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <div className="layout-container">
                        <Sidebar />
                        <main className="main-content">
                            <Header />
                            <div className="content-inner">{children}</div>
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
