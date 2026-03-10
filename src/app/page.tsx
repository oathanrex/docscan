export default function Dashboard() {
    return (
        <div>
            <h1>Welcome to DocScan Pro</h1>
            <p style={{ marginTop: '10px', color: 'var(--border-color)' }}>Developer-first document scanning platform.</p>

            <div className="card" style={{ marginTop: '30px' }}>
                <h2>System Status</h2>
                <p style={{ color: 'green', marginTop: '10px' }}>All systems operational.</p>
            </div>

            <div className="card">
                <h2>Recent Usage</h2>
                <p style={{ marginTop: '10px' }}>API Calls Today: <strong>145</strong></p>
                <p>Documents Processed: <strong>32</strong></p>
            </div>
        </div>
    )
}
