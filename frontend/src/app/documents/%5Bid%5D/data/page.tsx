'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL

export default function DocumentDataPage() {
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
            <h1>Structured Data (JSON)</h1>
            
            <div className="card" style={{ marginTop: '20px' }}>
                {!doc ? (
                    <p>Loading...</p>
                ) : doc.status !== 'completed' ? (
                    <p style={{ color: '#f39c12' }}>Processing in progress. Please check back in a few seconds.</p>
                ) : !doc.structured_data ? (
                    <p style={{ color: 'var(--border-color)' }}>No structured data extracted yet.</p>
                ) : (
                    <pre style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '8px' }}>
                        {JSON.stringify(doc.structured_data, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    )
}
