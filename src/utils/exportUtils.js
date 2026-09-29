/**
 * Export Utility Functions for SecureMailScope
 * Provides real client-side downloads for CSV, JSON, and Formatted Audit Reports
 */

// Export tabular or list data as CSV
export function downloadCSV(filename, data, columns) {
  if (!data || !data.length) return;

  const headers = columns.map(c => typeof c === 'string' ? c : c.header);
  const keys = columns.map(c => typeof c === 'string' ? c : c.key);

  const csvRows = [];
  // Header row
  csvRows.push(headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(','));

  // Data rows
  for (const item of data) {
    const values = keys.map(key => {
      const val = item[key] !== undefined && item[key] !== null ? item[key] : '';
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvContent = '\uFEFF' + csvRows.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(blob, filename.endsWith('.csv') ? filename : `${filename}.csv`);
}

// Export structured object as formatted JSON
export function downloadJSON(filename, data) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
  triggerDownload(blob, filename.endsWith('.json') ? filename : `${filename}.json`);
}

// Export formal report as clean formatted HTML/PDF file
export function downloadReportDoc(filename, reportData) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${reportData.title || 'Cryptographic Assessment Report'}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 40px auto;
      max-width: 800px;
      color: #1e293b;
      line-height: 1.5;
      padding: 0 20px;
    }
    .header {
      background: #243348;
      color: white;
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 24px;
      border-bottom: 4px solid #e07a5f;
    }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; }
    .header p { margin: 0; font-size: 13px; color: #f3ede2; }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      background: #f8fafc;
      padding: 16px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      margin-bottom: 24px;
      font-size: 12px;
    }
    .meta-item strong { display: block; color: #64748b; font-size: 11px; text-transform: uppercase; }
    .meta-item span { font-size: 14px; font-weight: 600; }
    .section { margin-bottom: 24px; }
    .section h2 {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin-bottom: 12px;
      color: #1e293b;
    }
    .stat-row { display: flex; gap: 12px; margin-bottom: 16px; }
    .stat-box {
      flex: 1;
      padding: 12px;
      border-radius: 6px;
      text-align: center;
    }
    .stat-high { background: #fee2e2; border: 1px solid #fecaca; color: #991b1b; }
    .stat-med { background: #fef3c7; border: 1px solid #fde68a; color: #92400e; }
    .stat-low { background: #f1f5f9; border: 1px solid #e2e8f0; color: #475569; }
    .stat-box .num { font-size: 24px; font-weight: bold; margin-top: 4px; display: block; }
    .card {
      background: white;
      border: 1px solid #e2e8f0;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-size: 12px;
    }
    .card strong { color: #0f172a; display: block; margin-bottom: 2px; }
    .card p { margin: 0; color: #475569; }
    .rec-item {
      display: flex;
      gap: 12px;
      padding: 10px 14px;
      background: #fdfbf7;
      border: 1px solid #f3ede2;
      border-radius: 6px;
      margin-bottom: 8px;
      font-size: 12px;
    }
    .rec-num {
      width: 22px;
      height: 22px;
      background: #243348;
      color: #f3ede2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 11px;
      flex-shrink: 0;
    }
    .footer {
      margin-top: 30px;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #94a3b8;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${reportData.title || 'SecureMailScope Assessment'}</h1>
    <p>Cryptographic Security Audit & Compliance Assessment</p>
  </div>

  <div class="meta-grid">
    <div class="meta-item">
      <strong>Target PCAP</strong>
      <span>${reportData.pcapSource || 'secure_email.pcap'}</span>
    </div>
    <div class="meta-item">
      <strong>Risk Score</strong>
      <span>${reportData.score || 72}/100 (${reportData.overallRisk || 'MEDIUM'})</span>
    </div>
    <div class="meta-item">
      <strong>Evaluated Protocols</strong>
      <span>${reportData.protocols || 'SMTP · IMAP · POP3'}</span>
    </div>
  </div>

  <div class="section">
    <h2>Findings Summary</h2>
    <div class="stat-row">
      <div class="stat-box stat-high">
        <div>High Severity</div>
        <span class="num">${reportData.findingsSummary?.high || 1}</span>
      </div>
      <div class="stat-box stat-med">
        <div>Medium Severity</div>
        <span class="num">${reportData.findingsSummary?.medium || 2}</span>
      </div>
      <div class="stat-box stat-low">
        <div>Low Severity</div>
        <span class="num">${reportData.findingsSummary?.low || 3}</span>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Key Observations</h2>
    ${(reportData.keyObservations || []).map(obs => `
      <div class="card">
        <strong>Observation</strong>
        <p>${obs}</p>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <h2>Strategic Recommendations</h2>
    ${(reportData.recommendations || []).map((rec, idx) => `
      <div class="rec-item">
        <div class="rec-num">${idx + 1}</div>
        <div>${rec}</div>
      </div>
    `).join('')}
  </div>

  <div class="footer">
    <span>SecureMailScope SaaS Posture Engine</span>
    <span>Compliance: NIST SP 800-52r2 · RFC 8461</span>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  triggerDownload(blob, filename.endsWith('.html') ? filename : `${filename}.html`);
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
