'use client'

export default function SettingsPage() {
    return (
        <div>
            <h1>Account Settings</h1>
            <p style={{ marginTop: '10px', color: 'var(--border-color)' }}>Manage your personal account and preferences.</p>

            <div className="card" style={{ marginTop: '30px' }}>
                <form>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
                        <input
                            type="email"
                            defaultValue="developer@example.com"
                            style={{ padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                        />
                    </div>

                    <button type="button" className="btn" style={{ marginTop: '20px' }}>Save Changes</button>
                </form>
            </div>
        </div>
    )
}
