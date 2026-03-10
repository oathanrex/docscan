'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL

export default function DocumentSummaryPage() {
    const { id } = useParams()
    const [doc, setDoc] = useState<any>(null)

    useEffect(() => {
        fetch(`${API}/api/v1/documents/${id}`)
            .then(res => res.json())
            .then(setDoc)
    }, [id])

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <Link href={`/documents/${id}`} className="text-link">← Back to Details</Link>
            </div>
            <h1>AI Summary</h1>
            
            <div className="card" style={{ marginTop: '20px' }}>
                {!doc ? (
                    <p>Loading...</p>
                ) : doc.status !== 'completed' ? (
                    <p style={{ color: '#f39c12' }}>Processing in progress. Please check back in a few seconds.</p>
                ) : !doc.summary ? (
                    <p style={{ color: 'var(--border-color)' }}>No summary generated for this document yet.</p>
                ) : (
                    <div style={{ lineHeight: '1.6', fontSize: '16px' }}>
                        {doc.summary}
                    </div>
                )}
            </div>
        </div>
    )
}
