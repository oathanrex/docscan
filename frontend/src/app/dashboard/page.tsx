'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL

export default function DashboardPage() {
    const [stats, setStats] = useState({ total: 0, processing: 0, completed: 0 })
    const [recentDocs, setRecentDocs] = useState([])

    useEffect(() => {
        fetch(`${API}/api/v1/documents`)
            .then(res => res.json())
            .then(data => {
                const completed = data.filter(d => d.status === 'completed').length
                const processing = data.filter(d => d.status === 'processing' || d.status === 'pending').length
                setStats({ total: data.length, processing, completed })
                setRecentDocs(data.slice(0, 5))
            })
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
            <p style={{ marginTop: '10px', color: 'var(--border-color)' }}>Overview of your document processing activities.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
                <div className="card">
                    <h3>Total Documents</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>{stats.total}</p>
                </div>
                <div className="card">
                    <h3>Processing</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px', color: '#f39c12' }}>{stats.processing}</p>
                </div>
                <div className="card">
                    <h3>Completed</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px', color: '#2ecc71' }}>{stats.completed}</p>
                </div>
            </div>

            <div className="card" style={{ marginTop: '30px' }}>
                <h2>Recent Activity</h2>
                <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
                    {recentDocs.length === 0 ? (
                        <p style={{ color: 'var(--border-color)' }}>No recent activity to show.</p>
                    ) : (
                        recentDocs.map(doc => (
                            <li key={doc.job_id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                                <div>
                                    <span style={{ fontWeight: '500' }}>{doc.original_filename || doc.job_id}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--border-color)', marginLeft: '10px' }}>{new Date(doc.created_at).toLocaleDateString()}</span>
                                </div>
                                <Link href={`/documents/${doc.job_id}`} className="text-link">View Details</Link>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    )
}
