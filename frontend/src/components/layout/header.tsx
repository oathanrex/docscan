'use client'
import { useTheme } from '../ThemeProvider'

export default function Header() {
    const { theme, toggleTheme } = useTheme()

    return (
        <header className="header">
            <div className="search">
                API Dashboard
            </div>
            <div className="actions">
                <button onClick={toggleTheme} className="btn">
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
            </div>
        </header>
    )
}
