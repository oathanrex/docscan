'use client'

export default function WebhooksPage() {
    return (
        <div>
            <h1>Webhooks</h1>
            <p style={{ marginTop: '10px', color: 'var(--border-color)' }}>Configure endpoints to receive asynchronous processing updates.</p>

            <button className="btn" style={{ marginTop: '20px' }}>Add Endpoint</button>

            <div className="card" style={{ marginTop: '30px' }}>
                <p style={{ color: 'var(--border-color)' }}>No webhooks registered.</p>
            </div>
        </div>
    )
}
