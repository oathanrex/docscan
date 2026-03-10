'use client'

export default function DocumentsPage() {
    return (
        <div>
            <h1>Document History</h1>
            <p style={{ marginTop: '10px', color: 'var(--border-color)' }}>View and manage your processed documents.</p>

            <div className="card" style={{ marginTop: '30px' }}>
                <table style={{ width: '100%', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} style={{ paddingTop: '20px', color: 'var(--border-color)' }}>No documents found in history.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
