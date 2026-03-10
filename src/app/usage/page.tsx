'use client'

export default function UsagePage() {
    return (
        <div>
            <h1>Usage Analytics</h1>
            <p style={{ marginTop: '10px', color: 'var(--border-color)' }}>Track API and document processing consumption.</p>

            <div className="card" style={{ marginTop: '30px' }}>
                <h2>Current Billing Cycle</h2>
                <p style={{ marginTop: '15px' }}><strong>API Calls:</strong> 0 / 1000</p>
                <p><strong>Documents:</strong> 0 / 100</p>
                <p><strong>Storage:</strong> 0 MB / 1024 MB</p>
            </div>
        </div>
    )
}
