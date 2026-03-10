import { render, screen, fireEvent } from '@testing-library/react'
import UploadPage from '../app/upload/page'

describe('UploadPage Component', () => {
    it('renders upload title', () => {
        render(<UploadPage />)
        expect(screen.getByText(/Test Document Upload/i)).toBeInTheDocument()
    })

    it('renders process document button', () => {
        render(<UploadPage />)
        const button = screen.getByRole('button', { name: /Process Document/i })
        expect(button).toBeInTheDocument()
        expect(button).toBeDisabled()
    })
})
