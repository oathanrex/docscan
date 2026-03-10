'use client'

export default function SemanticSearchPage() {
    return (
        <div>
            <h1>Semantic Search</h1>
            <p style={{ marginTop: '10px', color: 'var(--border-color)' }}>Query documents via natural language powered by pgvector index.</p>

            <div className="card" style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="e.g., Invoices from Microsoft over $1000..."
                        style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    />
                    <button className="btn">Search</button>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <p style={{ color: 'var(--border-color)' }}>No search results to display.</p>
                </div>
            </div>
        </div>
    )
}
