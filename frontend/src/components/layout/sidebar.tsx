import Link from 'next/link'

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>DocScan Pro</h2>
            <nav style={{ marginTop: '20px' }}>
                <ul>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/documents">History</Link></li>
                    <li><Link href="/upload">Upload</Link></li>
                    <li><Link href="/api-keys">API Keys</Link></li>
                    <li><Link href="/usage">Usage & Billing</Link></li>
                </ul>
            </nav>
        </aside>
    )
}
