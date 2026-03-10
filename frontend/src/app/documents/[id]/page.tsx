'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL

export default function DocumentDetailPage() {
    const { id } = useParams()
    const [doc, setDoc] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let interval: NodeJS.Timeout

        const fetchDoc = async () => {
            try {
                const res = await fetch(`${API}/api/v1/documents/${id}`)
                const data = await res.json()
                setDoc(data)
                setLoading(false)

                if (data.status === 'completed' || data.status === 'failed') {
                    clearInterval(interval)
                }
            } catch (err) {
                console.error('Failed to fetch doc', err)
            }
        }

        fetchDoc()
        interval = setInterval(fetchDoc, 3000)

        return () => clearInterval(interval)
    }, [id])

    if (loading) return <div>Loading document details...</div>
    if (!doc) return <div>Document not found.</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>{doc.original_filename || 'Document Detail'}</h1>
                <span className={`status-badge ${doc.status}`}>{doc.status}</span>
            </div>
            
            <p style={{ marginTop: '10px', color: 'var(--border-color)' }}>Job ID: {doc.job_id}</p>

            <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <Link href={`/documents/${id}/ocr`} className="btn">OCR Text</Link>
                <Link href={`/documents/${id}/data`} className="btn">Structured Data</Link>
                <Link href={`/documents/${id}/summary`} className="btn">AI Summary</Link>
            </div>

            <div className="card" style={{ marginTop: '30px' }}>
                <h3>Document Metadata</h3>
                <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--border-color)' }}>Created At</label>
                        <p>{new Date(doc.created_at).toLocaleString()}</p>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--border-color)' }}>Classification</label>
                        <p>{doc.classification || 'Pending...'}</p>
                    </div>
                </div>
            </div>

            {doc.status === 'processing' && (
                <div className="card" style={{ marginTop: '20px', backgroundColor: 'rgba(243, 156, 18, 0.1)', border: '1px solid #f39c12' }}>
                    <p style={{ color: '#f39c12' }}>Document is currently being processed. Results will appear automatically.</p>
                </div>
            )}
        </div>
    )
}
