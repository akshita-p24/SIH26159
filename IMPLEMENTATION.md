# SecureMailScope — Technical Implementation Document
**AI-Assisted Cryptographic Security Posture Assessment for Secure Email Communications**

---

## 1. Executive Product Architecture

**SecureMailScope** is an enterprise-grade cybersecurity SaaS platform engineered to assess, classify, and remediate the cryptographic posture of corporate email transport infrastructures (SMTP, IMAP, and POP3). 

Unlike generic network monitors or student dashboard prototypes, SecureMailScope focuses strictly on **cryptographic hygiene and transport layer security (TLS)**. It ingests captured network packet traces (`.pcap`, `.pcapng`), extracts cryptographic handshakes (ClientHello, ServerHello, Certificate chains, and STARTTLS negotiation streams), executes four specialized machine learning inference models, and computes **SHAP (SHapley Additive exPlanations)** game-theoretic feature attributions to provide transparent, auditor-ready security assessments.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 SecureMailScope SaaS                                   │
├───────────────────────┬────────────────────────────────────────────────────────────────┤
│      Sidebar Nav      │ Header: Dynamic Module Title · Global CVE Search · Dr. Vance   │
├───────────────────────┼────────────────────────────────────────────────────────────────┤
│ • Security Overview   │ [Screen 1] Overall Security Posture (Score: 72/100, Gauge, Trend)│
│ • PCAP Analysis       │ [Screen 2] Capture Ingestion (1,284 Packets, 2.41s Dissection) │
│ • Protocol Analysis   │ [Screen 3] SMTP (Secure) · IMAP (Warning) · POP3 (Critical)    │
│ • TLS Security Audit  │ [Screen 4] 94% Coverage Dial · 65% TLS 1.3 · 6% Obsolete TLS 1.0│
│ • Security Findings   │ [Screen 5] Enterprise Vulnerability Table (5 CVE / RFC issues) │
│ • AI Posture Models   │ [Screen 6] 4 Machine Learning Classifier Cards (XGBoost/RF)    │
│ • SHAP Explainability │ [Screen 7] Feature Importance (+0.31 Cipher, +0.24 TLS Ver)    │
│ • Security Report     │ [Screen 8] CISO & Auditor Assessment Report (PDF, JSON, CSV)   │
│ • System Settings     │ [Screen 9] NIST SP 800-52r2 & PCI-DSS 4.0 Standard Baseline    │
└───────────────────────┴────────────────────────────────────────────────────────────────┘
```

---

## 2. Visual Design System & Aesthetic Governance

The visual identity follows an uncompromising enterprise security ethos: **Minimal, Technical, Precise, Restrained, and Trustworthy**. It intentionally eliminates distracting gamer/hacker tropes (neon greens, glowing cyber-borders, 3D graphics, crypto motifs) in favor of high-density cryptographic data readability.

### Strict Color Palette

| Token Name | Hex Code | Role & Usage Restrictions |
| :--- | :--- | :--- |
| **Deep Purple** | `#32004B` | **Primary Brand Color.** Navigation sidebar background, primary headers, authoritative branding. |
| **Orange** | `#DD6E2D` | **Controlled Accent.** Primary CTA buttons, active navigation indicator, high severity badges, primary SHAP driver. *Used sparingly to preserve visual hierarchy.* |
| **Warm Cream** | `#EDDEC2` | **Supporting Background.** Highlight callout banners, SHAP narrative explanation panels, active nav background. |
| **White** | `#FFFFFF` | **Surface.** Card containers, table backdrops, modal dialogues, input fields. |
| **Near-Black** | `#17151A` | **Primary Typography.** Primary headlines, numeric metrics, high-emphasis text. |
| **Dark Gray** | `#242126` | **Secondary Typography.** Body copy, table values, technical descriptions. |
| **Muted Gray** | `#77727A` | **Tertiary Typography & Grid.** Subtitles, table headers, chart grid lines, metadata. |
| **Light Gray** | `#F5F3F1` | **Canvas Background.** Application backdrop, secondary badge backgrounds, inset panels. |
| **Border Gray** | `#E5DFD8` | **Dividers & Strokes.** Clean 1px borders, subtle card separation, table row dividers. |

### Typography & Spacing
- **Primary Typeface:** `Inter` (Google Fonts) with weights 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold).
- **Technical Monospace:** `JetBrains Mono` for cipher strings, packet offsets, CVE identifiers, SHA-256 checksums, and hex traces.
- **Corner Radii:** Controlled `8px`–`10px` (`rounded-[8px]`, `rounded-[10px]`) for a sleek enterprise look.

---

## 3. Codebase File Structure

The project is structured with modern, modular React functional components and clean separation of concerns:

```
sih262159/
├── index.html                  # Standalone interactive application (zero-dependency direct browser preview)
├── package.json                # Dependencies: React 18, React Router v6, Lucide React, Tailwind CSS
├── vite.config.js              # Vite bundler configuration
├── tailwind.config.js          # Tailwind tokens & brand theme extensions
├── IMPLEMENTATION.md           # Formal architectural and implementation documentation
└── src/
    ├── main.jsx                # React root mount with HashRouter
    ├── App.jsx                 # SaaS layout shell, responsive sidebar toggle, route resolution
    ├── index.css               # Design tokens, Google fonts, custom scrollbars, card utilities
    ├── components/
    │   ├── Button.jsx          # Multi-variant CTA button (primary orange, brand purple, secondary cream)
    │   ├── ChartCard.jsx       # Standardized enterprise card wrapper with title, subtitle, and action slots
    │   ├── FindingTable.jsx    # Enterprise vulnerability table with live search, severity filters, and detail drawer
    │   ├── Header.jsx          # SaaS header with dynamic title, breadcrumbs, search, and user profile
    │   ├── ProtocolCard.jsx    # Technical telemetry card for SMTP, IMAP, and POP3 mail streams
    │   ├── SecurityBadge.jsx   # Severity and risk badges with Lucide icons (HIGH, MEDIUM, LOW, SECURE, etc.)
    │   ├── Sidebar.jsx         # Collapsible desktop SaaS sidebar with active state styling
    │   └── StatCard.jsx        # Enterprise KPI card with title, numeric value, status label, and badges
    └── pages/
        ├── Dashboard.jsx       # Screen 1: Overall Security Posture (Gauge, Trend, KPIs, Protocol Overview)
        ├── PCAPAnalysis.jsx    # Screen 2: Capture upload, packet ingestion, and execution telemetry
        ├── Protocols.jsx       # Screen 3: SMTP, IMAP, POP3 deep cryptographic breakdown & matrix
        ├── TLSAnalysis.jsx     # Screen 4: 94% coverage dial, TLS version distribution, cipher classification
        ├── Findings.jsx        # Screen 5: Comprehensive vulnerability inventory with packet evidence
        ├── AIAnalysis.jsx      # Screen 6: 4 ML model inference cards (XGBoost, Random Forest, Meta-learner)
        ├── Explainability.jsx  # Screen 7: SHAP feature importance plot and mathematical narrative
        ├── Reports.jsx         # Screen 8: Formal auditor report preview with PDF, JSON, and CSV export
        └── Settings.jsx        # Screen 9: Baseline standards (NIST SP 800-52r2, PCI-DSS 4.0) & AI tuning
```

---

## 4. Module-by-Module Technical Specification

### Module 1: Dashboard (`/` — Security Overview)
- **Header:** "Security Overview" | Subtitle: "AI-Assisted Cryptographic Security Assessment"
- **Active Assessment Context Banner:** Highlight panel (`#EDDEC2`) identifying the inspected trace (`secure_email.pcap`), severity flag (`MEDIUM RISK`), and quick action buttons.
- **5 KPI Metric Cards:**
  1. `Overall Security Score`: **72 / 100** (Status: `MEDIUM RISK`, highlighted with `#DD6E2D` border)
  2. `TLS Coverage`: **94%** (43 of 46 handshakes encrypted)
  3. `Weak Ciphers`: **3** (Flagged for 3DES and CBC padding)
  4. `Certificate Issues`: **1** (Host SAN validation failure on POP3)
  5. `Network Connections`: **46** (SMTP: 21 | IMAP: 17 | POP3: 8)
- **Cryptographic Posture Meter (Gauge):** SVG semi-circular dial visualizing `72/100` with category breakdowns: Cipher (64/100), Protocol (76/100), Cert PKI (88/100).
- **Security Score Trend:** Vector line chart charting 6 historical assessment runs (`Sep 12: 84`, `Sep 16: 81`, `Sep 20: 79`, `Sep 24: 75`, `Sep 27: 70`, `Sep 29: 72`).
- **Key Findings Breakdown:** Compact severity breakdown (High: 1, Medium: 2, Low: 3) with direct routing to detailed findings.
- **Protocol Security Overview:** Live telemetry cards for SMTP, IMAP, and POP3.

### Module 2: PCAP Analysis (`/pcap`)
- **Page Title:** "PCAP Analysis" | Subtitle: "Analyze captured email traffic and identify cryptographic security weaknesses."
- **Dropzone Area:** Full drag-and-drop file ingestion area featuring Lucide `UploadCloud`, formatted with dashed enterprise borders, browse button, and 250 MB file limit notice.
- **Staged File Card:** Represents `secure_email.pcap` (4.82 MB, uploaded, checksum verified) with an interactive **"Analyze PCAP"** button styled in brand orange (`#DD6E2D`).
- **Simulated Execution State:** Dynamic parsing progress bar animating TCP stream reconstruction and ClientHello tokenization.
- **Analysis Results Grid (Post-Execution):**
  - Success banner with Lucide `CircleCheck`: *"Analysis completed successfully"*.
  - Metric breakdown: Packets Analyzed (**1,284**), TLS Connections (**46**), SMTP Connections (**21**), IMAP Connections (**17**), POP3 Connections (**8**), Processing Time (**2.41 sec**).

### Module 3: Protocol Analysis (`/protocols`)
- **Three Protocol Telemetry Cards:**
  - **SMTP:** Status `SECURE`, Connections: 21, TLS Version: `TLS 1.3`, Cipher Suite: `AES-256-GCM`, STARTTLS: `Enabled`, Certificate: `Valid`, AI Risk: `Low`.
  - **IMAP:** Status `WARNING`, Connections: 17, TLS Version: `TLS 1.2`, Cipher Suite: `AES-128-GCM`, STARTTLS: `Enabled`, Certificate: `Valid`, AI Risk: `Medium`.
  - **POP3:** Status `CRITICAL`, Connections: 8, TLS Version: `TLS 1.0` (Obsolete), Cipher Suite: `Weak Cipher` (3DES), STARTTLS: `Misconfigured`, Certificate: `Issue Detected`, AI Risk: `High`.
- **Protocol Cryptographic Posture Matrix:** High-density enterprise table comparing traffic share, negotiated TLS version, AEAD ciphers, key exchange (X25519 vs DH-1024), and Perfect Forward Secrecy (PFS).
- **Remediation Directives:** Concrete instructions for mail daemons (Postfix, Sendmail, Dovecot).

### Module 4: TLS Security Analysis (`/tls`)
- **Page Title:** "TLS Security Analysis"
- **Security Observation Banner:** Callout stating: *"Legacy TLS and weak cryptographic configurations were detected in a subset of analyzed connections."*
- **Encrypted Traffic Coverage Gauge:** Radial dial showing **94%** coverage (43 of 46 sessions encrypted).
- **TLS Version Distribution Chart:**
  - `TLS 1.3`: **65%** (30 sessions — Modern, PFS guaranteed)
  - `TLS 1.2`: **29%** (13 sessions — Standard)
  - `TLS 1.0`: **6%** (3 sessions — Obsolete, violates RFC 8996 and PCI-DSS)
- **Cipher Suite Classification Chart:** Horizontal proportional bars:
  - Strong (AEAD): **67.4%** (`AES-256-GCM-SHA384`, `CHACHA20-POLY1305`)
  - Acceptable: **26.1%** (`AES-128-GCM-SHA256`)
  - Weak (Insecure): **6.5%** (`3DES-EDE-CBC-SHA`)
- **STARTTLS Usage Comparison:** Comparative telemetry meters: SMTP (95%), IMAP (91%), POP3 (72%).

### Module 5: Security Findings (`/findings`)
- **Severity Summary Row:** Visual metric cards for High (1), Medium (2), Low (3), and Total (5 issues).
- **Enterprise Vulnerability Table:**
  - Columns: `Severity`, `Finding`, `Protocol`, `Cryptographic Evidence`, `Status`, `Detail Action`.
  - **Finding 1:** High | Weak cipher suite | SMTP | `TLS_RSA_WITH_3DES_EDE_CBC_SHA` | Open | SWEET32 CVE-2016-2183
  - **Finding 2:** Medium | TLS 1.0 detected | IMAP | `TLSv1.0 handshake` | Active | RFC 8996 Violation
  - **Finding 3:** Medium | Certificate issue | POP3 | `Certificate validation failure` | Investigating | CWE-295
  - **Finding 4:** Low | STARTTLS misconfiguration | SMTP | `STARTTLS negotiation inconsistency` | In Review | RFC 3207
  - **Finding 5:** Low | Weak key exchange | IMAP | `Legacy DH parameters` (1024-bit prime) | Monitoring | Logjam
- **Interactive Detail Drawer:** Clicking any finding reveals cryptographic packet offsets, exploitability impact, and exact configuration fix commands.

### Module 6: AI Security Analysis (`/ai-analysis`)
- **Page Title:** "AI Security Analysis" | Subtitle: "Machine-learning models used to classify cryptographic security posture."
- **Four Technical Model Cards:**
  1. **TLS Version Classifier:**
     - Architecture: Handshake Tokenization Gradient Boosted Trees (XGBoost)
     - Prediction: `MODERN` | Confidence: **96.2%** | Lucide `Cpu`
  2. **Cipher Security Classifier:**
     - Architecture: Cryptographic Primitive Evaluator (Random Forest)
     - Prediction: `WEAK` | Confidence: **91.4%** | Lucide `Brain`
  3. **Certificate Risk Detector:**
     - Architecture: X.509 Heuristic Chain Network
     - Prediction: `LOW RISK` | Confidence: **94.8%** | Lucide `ShieldCheck`
  4. **Overall Security Risk Model:**
     - Architecture: Multi-Layer Stacking Meta-Learner
     - Prediction: `MEDIUM RISK` | Confidence: **89.7%** | Lucide `Brain`
- **Technical Credibility Principles:** Clarifies zero payload exposure (operates solely on handshake metadata) and alignment with FIPS 140-3 & NIST 800-52r2.

### Module 7: SHAP Explainability (`/explainability`)
- **Page Title:** "AI Explainability" | Subtitle: "Understand which security features influenced the model prediction."
- **Mathematical Context:** Explains Shapley Additive exPlanations based on cooperative game theory:
  $$\text{Score } f(X) = E[f(X)] + \sum_{i=1}^{M} \phi_i$$
  Base value $E[f(X)] = 0.18 \rightarrow$ Output $f(X) = 0.72$ (Medium Risk).
- **Explanation Panel:**
  - Title: *"Why was this classified as MEDIUM RISK?"*
  - Content: *"The model identified weak cipher configuration as the primary contributing feature, followed by the detected TLS version and certificate-related characteristics."*
  - Primary Label: **Primary contributing factor: "Weak Cipher Suite"**
- **SHAP Feature Importance Visualization (Horizontal Waterfall):**
  - **Weak Cipher Suite:** **+0.31** (Primary factor, highlighted in `#DD6E2D`)
  - **TLS Version:** **+0.24**
  - **Certificate Validity:** **+0.15**
  - **STARTTLS Configuration:** **+0.10**
  - **Key Exchange:** **+0.04**

### Module 8: Security Assessment Report (`/reports`)
- **Page Title:** "Security Assessment Report"
- **Export Toolbar:** Primary **"Export PDF"** button (Orange `#DD6E2D`), **"Export JSON"** (creates genuine downloadable JSON blob), **"Export CSV"**, and Print trigger.
- **Enterprise Report Preview Document:**
  - Header: SecureMailScope "Cryptographic Security Assessment", Ref: `SMS-AUDIT-2026-0929`.
  - Assessment metadata: Target `secure_email.pcap`, Overall Risk `MEDIUM`, Protocols `SMTP · IMAP · POP3`.
  - Findings Summary: High: 1, Medium: 2, Low: 3.
  - Key Observations: Weak cipher detected, TLS 1.0 connection detected, Certificate issue detected.
  - Strategic Recommendations:
    1. Disable obsolete TLS versions (TLS 1.0 & 1.1)
    2. Remove weak cipher suites (Deprecate 3DES and RC4)
    3. Enforce modern TLS configurations (TLS 1.3 with AES-GCM / CHACHA20)
    4. Ensure valid and auto-renewed certificates with complete SAN chains.

---

## 5. Execution & Verification Guide

### Mode 1: Zero-Dependency Instant Browser Launch (Recommended)
Because Node.js may not be pre-installed on every client machine, the root `index.html` has been engineered as a self-contained, standalone enterprise application. It incorporates React 18, Babel compiler, Tailwind CSS engine, and Lucide icons via high-availability CDNs.

1. Navigate to:
   ```
   c:\Users\patar\OneDrive\Desktop\sih262159\index.html
   ```
2. Double-click `index.html` or open in any modern browser (Chrome, Edge, Firefox).
3. All 8 screens, interactive filters, modal drawers, PCAP upload simulations, and report exports will execute with 100% fidelity.

### Mode 2: Node.js / Vite Production Build
When deploying in a CI/CD container with Node.js installed:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Compile optimized production bundle
npm run build
```

---

## 6. Regulatory & Cryptographic Compliance Cross-Reference

| Standard / RFC | Requirement | SecureMailScope Verification |
| :--- | :--- | :--- |
| **NIST SP 800-52 Rev 2** | Mandates TLS 1.2 / 1.3; deprecates CBC-mode ciphers without AEAD | Flags 3DES as HIGH severity; validates AES-256-GCM suites |
| **IETF RFC 8996** | Formal deprecation of TLS 1.0 and TLS 1.1 across the Internet | Detects POP3 TLS 1.0 handshake and assigns +0.24 SHAP risk factor |
| **IETF RFC 8461 (MTA-STS)** | SMTP Mail Transfer Agent Strict Transport Security | Checks opportunistic STARTTLS upgrade and flags unauthenticated sessions |
| **CVE-2016-2183 (SWEET32)** | Proof-of-concept birthday attack on 64-bit block ciphers | Inspects cipher token `TLS_RSA_WITH_3DES_EDE_CBC_SHA` and alerts SecOps |

---

*SecureMailScope — Engineered for rigorous cryptographic email security posture validation.*
