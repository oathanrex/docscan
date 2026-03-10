'use client'

export default function DocumentAnalysisPage() {
    return (
        <div>
            <h1>Advanced Document Analysis</h1>
            <p style={{ marginTop: '10px', color: 'var(--border-color)' }}>Detailed view of OCR confidence, table grids, and classification results per document.</p>

            <div className="card" style={{ marginTop: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <h4>Classification Match</h4>
                        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Uncategorized</p>
                    </div>
                    <div>
                        <h4>Detected Tables</h4>
                        <p style={{ marginTop: '10px' }}>0 Grid Lines Found</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
