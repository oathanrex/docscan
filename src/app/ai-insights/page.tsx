'use client'

export default function AIInsightsPage() {
    return (
        <div>
            <h1>AI Insights & Summaries</h1>
            <p style={{ marginTop: '10px', color: 'var(--border-color)' }}>Overview of document classifications, identified schemas, and LLM-generated summaries.</p>

            <div className="card" style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1, borderRight: '1px solid var(--border-color)', paddingRight: '20px' }}>
                    <h3>Extracted Schemas (Invoices)</h3>
                    <p style={{ marginTop: '10px', color: 'var(--border-color)', fontSize: '14px' }}>JSON data mapped from bounding boxes.</p>
                    <pre style={{ marginTop: '10px', padding: '10px', backgroundColor: 'var(--bg-color)', borderRadius: '4px' }}>
                        {"{\n  \"status\": \"Waiting for extraction pipeline...\"\n}"}
                    </pre>
                </div>

                <div style={{ flex: 1 }}>
                    <h3>LLM Summaries</h3>
                    <p style={{ marginTop: '10px', color: 'var(--border-color)', fontSize: '14px' }}>Awaiting initial batch processing completion...</p>
                </div>
            </div>
        </div>
    )
}
