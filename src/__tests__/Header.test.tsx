import { render, screen } from '@testing-library/react'
import Header from '../../components/layout/header'
import { ThemeProvider } from '../../components/ThemeProvider'

describe('Header Component', () => {
    it('renders header with API Dashboard title', () => {
        render(
            <ThemeProvider>
                <Header />
            </ThemeProvider>
        )
        expect(screen.getByText(/API Dashboard/i)).toBeInTheDocument()
    })

    it('renders theme toggle button', () => {
        render(
            <ThemeProvider>
                <Header />
            </ThemeProvider>
        )
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })
})
