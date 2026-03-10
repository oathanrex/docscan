'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL

export default function UploadPage() {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState('')

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return

        setStatus('Uploading...')

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch(`${API}/api/v1/documents/upload`, {
                method: 'POST',
                body: formData,
            })

            const data = await res.json()

            if (res.ok) {
                setStatus(`Uploaded successfully. Redirecting...`)
                router.push(`/documents/${data.job_id}`)
            } else {
                setStatus(`Error: ${data.detail || 'Upload failed'}`)
            }

        } catch (err) {
            setStatus('Network Error')
        }
    }

    return (
        <div>
            <h1>Test Document Upload</h1>

            <div className="card" style={{ marginTop: '20px' }}>
                <form onSubmit={handleUpload}>
                    <div className="file-input-wrapper">
                        <input
                            type="file"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                    </div>

                    <button type="submit" className="btn" disabled={!file}>
                        Process Document
                    </button>
                </form>

                {status && <p style={{ marginTop: '20px' }}>{status}</p>}
            </div>
        </div>
    )
}
