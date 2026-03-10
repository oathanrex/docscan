'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL

interface Document {
    job_id: string
    status: string
    created_at: string
    original_filename: string
}

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API}/api/v1/documents`)
            .then(res => res.json())
            .then(data => {
                setDocuments(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <div>
            <h1>Document History</h1>
            <p style={{ marginTop: '10px', color: 'var(--border-color)' }}>View and manage your processed documents.</p>

            <div className="card" style={{ marginTop: '30px' }}>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '12px' }}>Filename</th>
                            <th style={{ padding: '12px' }}>Status</th>
                            <th style={{ padding: '12px' }}>Date</th>
                            <th style={{ padding: '12px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} style={{ padding: '20px', textAlign: 'center' }}>Loading history...</td>
                            </tr>
                        ) : documents.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: 'var(--border-color)' }}>No documents found in history.</td>
                            </tr>
                        ) : (
                            documents.map(doc => (
                                <tr key={doc.job_id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '12px' }}>{doc.original_filename || doc.job_id}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span className={`status-badge ${doc.status}`}>
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>{new Date(doc.created_at).toLocaleDateString()}</td>
                                    <td style={{ padding: '12px' }}>
                                        <Link href={`/documents/${doc.job_id}`} className="btn-small">View</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
