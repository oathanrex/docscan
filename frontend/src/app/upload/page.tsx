'use client'
import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL

export default function UploadPage() {

  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState('')
  const [jobId, setJobId] = useState('')

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

      if (!res.ok) {
        setStatus('Upload failed')
        return
      }

      const id = data.job_id
      setJobId(id)

      setStatus('Checking processing status...')

      const statusRes = await fetch(`${API}/api/v1/documents/${id}`)
      const statusData = await statusRes.json()

      setStatus(`Processing status: ${statusData.status}`)

    } catch (err) {

      setStatus('Network error')

    }

  }

  return (
    <div>

      <h1>DocScan Upload</h1>

      <form onSubmit={handleUpload}>

        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e)=>setFile(e.target.files?.[0] || null)}
        />

        <button type="submit" disabled={!file}>
          Upload
        </button>

      </form>

      {status && <p>Status: {status}</p>}

      {jobId && <p>Job ID: {jobId}</p>}

    </div>
  )
}
