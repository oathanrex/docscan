'use client'

export default function ApiKeysPage() {
    return (
        <div>
            <h1>API Keys</h1>
            <p style={{ marginTop: '10px', color: 'var(--border-color)' }}>Manage keys to authenticate your requests.</p>

            <button className="btn" style={{ marginTop: '20px' }}>Generate New Key</button>

            <div className="card" style={{ marginTop: '30px' }}>
                <p style={{ color: 'var(--border-color)' }}>No API keys have been generated yet.</p>
            </div>
        </div>
    )
}
