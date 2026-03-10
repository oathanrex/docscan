'use client'
import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL

export default function UploadPage() {

    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState('')
    const [jobId, setJobId] = useState('')
    const [result, setResult] = useState<any>(null)

    const handleUpload = async (e: React.FormEvent) => {

        e.preventDefault()
        if (!file) return

        setStatus('Uploading document...')

        const formData = new FormData()
        formData.append('file', file)

        try {

            // Upload
            const uploadRes = await fetch(`${API}/api/v1/documents/upload`, {
                method: 'POST',
                body: formData,
            })

            const uploadData = await uploadRes.json()

            if (!uploadRes.ok) {
                setStatus('Upload failed')
                return
            }

            const id = uploadData.job_id
            setJobId(id)

            setStatus('Checking processing status...')

            // Status
            const statusRes = await fetch(`${API}/api/v1/documents/${id}`)
            const statusData = await statusRes.json()

            // Classification
            setStatus('Classifying document...')

            const classifyRes = await fetch(`${API}/api/v1/documents/${id}/classify`, {
                method: 'POST'
            })
            const classifyData = await classifyRes.json()

            // Extraction
            setStatus('Extracting structured data...')

            const extractRes = await fetch(`${API}/api/v1/documents/${id}/extract`, {
                method: 'POST'
            })
            const extractData = await extractRes.json()

            // Summary
            setStatus('Generating summary...')

            const summaryRes = await fetch(`${API}/api/v1/documents/${id}/summary`, {
                method: 'POST'
            })
            const summaryData = await summaryRes.json()

            setResult({
                status: statusData,
                classification: classifyData,
                extracted: extractData,
                summary: summaryData
            })

            setStatus('Processing completed')

        } catch (err) {
            setStatus('Network error')
        }
    }

    return (
        <div style={{ maxWidth: 700, margin: '40px auto' }}>

            <h1>DocScan AI</h1>

            <div className="card" style={{ marginTop: '20px' }}>

                <form onSubmit={handleUpload}>

                    <div className="file-input-wrapper">

                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />

                    </div>

                    <button type="submit" className="btn" disabled={!file}>
                        Process Document
                    </button>

                </form>

                {status && (
                    <p style={{ marginTop: '20px' }}>
                        <b>Status:</b> {status}
                    </p>
                )}

                {jobId && (
                    <p>
                        <b>Job ID:</b> {jobId}
                    </p>
                )}

                {result && (

                    <div style={{ marginTop: '30px' }}>

                        <h3>Classification</h3>
                        <pre>{JSON.stringify(result.classification, null, 2)}</pre>

                        <h3>Extracted Data</h3>
                        <pre>{JSON.stringify(result.extracted, null, 2)}</pre>

                        <h3>Summary</h3>
                        <pre>{JSON.stringify(result.summary, null, 2)}</pre>

                    </div>

                )}

            </div>

        </div>
    )
}
