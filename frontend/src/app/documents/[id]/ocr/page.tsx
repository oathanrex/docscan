'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL

export default function DocumentOCRPage() {
    const { id } = useParams()
    const [doc, setDoc] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`${API || ''}/api/v1/documents/${id}`)
            .then(res => {
                if (!res.ok) throw new Error(`Status: ${res.status}`)
                return res.json()
            })
            .then(setDoc)
            .catch(err => setError(err.message))
    }, [id])

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <Link href={`/documents/${id}`} className="text-link">← Back to Details</Link>
            </div>
            <h1>OCR Extracted Text</h1>
            
            <div className="card" style={{ marginTop: '20px' }}>
                {error ? (
                    <p style={{ color: '#e74c3c' }}>Error: {error}</p>
                ) : !doc ? (
                    <p>Loading...</p>
                ) : doc.status !== 'completed' ? (
                    <p style={{ color: '#f39c12' }}>Processing in progress. Please check back in a few seconds.</p>
                ) : !doc.extracted_text ? (
                    <p style={{ color: 'var(--border-color)' }}>No text extracted from this document.</p>
                ) : (
                    <pre style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '8px' }}>
                        {doc.extracted_text}
                    </pre>
                )}
            </div>
        </div>
    )
}
