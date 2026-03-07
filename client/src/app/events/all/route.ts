import { NextRequest, NextResponse } from "next/server";

const mockEvents = [
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000001", sourceTool: "Snort", timestamp: "2026-03-07T14:23:10Z", severity: 0.92, description: "SQL injection attempt detected on /api/login endpoint", reportUrl: "https://reports.example.com/r/001", count: 5, askedAnalysis: true, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000002", sourceTool: "OSSEC", timestamp: "2026-03-07T13:45:32Z", severity: 0.85, description: "Rootkit detection triggered on host db-prod-01", reportUrl: "https://reports.example.com/r/002", count: 1, askedAnalysis: true, finished: false },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000003", sourceTool: "Suricata", timestamp: "2026-03-07T12:10:05Z", severity: 0.78, description: "Suspicious outbound traffic to known C2 server 198.51.100.44", reportUrl: "https://reports.example.com/r/003", count: 12, askedAnalysis: true, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000004", sourceTool: "ClamAV", timestamp: "2026-03-07T11:30:00Z", severity: 0.65, description: "Trojan.GenericKD.46876543 found in /tmp/uploads/invoice.pdf", reportUrl: "", count: 1, askedAnalysis: false, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000005", sourceTool: "Falco", timestamp: "2026-03-07T10:55:18Z", severity: 0.95, description: "Container escape attempt detected in pod kube-system/etcd-main", reportUrl: "https://reports.example.com/r/005", count: 2, askedAnalysis: true, finished: false },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000006", sourceTool: "Wazuh", timestamp: "2026-03-07T09:20:44Z", severity: 0.42, description: "Multiple failed SSH login attempts from 203.0.113.77", reportUrl: "", count: 47, askedAnalysis: false, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000007", sourceTool: "ModSecurity", timestamp: "2026-03-07T08:15:29Z", severity: 0.88, description: "Cross-site scripting (XSS) payload blocked on /search endpoint", reportUrl: "https://reports.example.com/r/007", count: 3, askedAnalysis: true, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000008", sourceTool: "Zeek", timestamp: "2026-03-07T07:40:11Z", severity: 0.55, description: "DNS tunneling activity detected from internal host 10.0.2.15", reportUrl: "https://reports.example.com/r/008", count: 8, askedAnalysis: false, finished: false },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000009", sourceTool: "Snort", timestamp: "2026-03-07T06:05:53Z", severity: 0.31, description: "Port scan detected from 192.0.2.100 targeting ports 1-1024", reportUrl: "", count: 1, askedAnalysis: false, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000010", sourceTool: "Trivy", timestamp: "2026-03-07T05:30:07Z", severity: 0.72, description: "Critical CVE-2026-1234 found in container image nginx:1.25", reportUrl: "https://reports.example.com/r/010", count: 1, askedAnalysis: true, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000011", sourceTool: "OSSEC", timestamp: "2026-03-06T23:58:40Z", severity: 0.60, description: "File integrity change detected on /etc/passwd", reportUrl: "", count: 1, askedAnalysis: true, finished: false },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000012", sourceTool: "Falco", timestamp: "2026-03-06T22:14:22Z", severity: 0.83, description: "Unexpected process 'cryptominer' spawned in production container", reportUrl: "https://reports.example.com/r/012", count: 1, askedAnalysis: true, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000013", sourceTool: "Suricata", timestamp: "2026-03-06T21:02:15Z", severity: 0.47, description: "TLS certificate mismatch for api.internal.corp", reportUrl: "", count: 3, askedAnalysis: false, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000014", sourceTool: "Wazuh", timestamp: "2026-03-06T19:48:33Z", severity: 0.38, description: "User 'admin' logged in from unusual geo-location (Country: RU)", reportUrl: "", count: 1, askedAnalysis: false, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000015", sourceTool: "ModSecurity", timestamp: "2026-03-06T18:30:09Z", severity: 0.91, description: "Remote code execution attempt via deserialization on /api/webhook", reportUrl: "https://reports.example.com/r/015", count: 2, askedAnalysis: true, finished: false },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000016", sourceTool: "ClamAV", timestamp: "2026-03-06T17:15:50Z", severity: 0.50, description: "PUA.Win32.Packer detected in uploaded file resume.docx", reportUrl: "", count: 1, askedAnalysis: false, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000017", sourceTool: "Zeek", timestamp: "2026-03-06T16:00:27Z", severity: 0.68, description: "Large data exfiltration detected: 2.3 GB uploaded to external IP", reportUrl: "https://reports.example.com/r/017", count: 1, askedAnalysis: true, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000018", sourceTool: "Trivy", timestamp: "2026-03-06T14:45:13Z", severity: 0.44, description: "Medium vulnerability CVE-2025-9876 in python:3.12-slim base image", reportUrl: "", count: 4, askedAnalysis: false, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000019", sourceTool: "Snort", timestamp: "2026-03-06T13:20:58Z", severity: 0.97, description: "Exploit kit delivery attempt via malicious ad redirect chain", reportUrl: "https://reports.example.com/r/019", count: 1, askedAnalysis: true, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000020", sourceTool: "Falco", timestamp: "2026-03-06T12:05:41Z", severity: 0.75, description: "Sensitive mount detected: /var/run/docker.sock mounted in container", reportUrl: "https://reports.example.com/r/020", count: 6, askedAnalysis: true, finished: false },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000021", sourceTool: "OSSEC", timestamp: "2026-03-06T10:50:30Z", severity: 0.22, description: "Successful sudo command by user 'deploy' on web-prod-03", reportUrl: "", count: 15, askedAnalysis: false, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000022", sourceTool: "Wazuh", timestamp: "2026-03-06T09:35:14Z", severity: 0.58, description: "Windows Defender disabled on endpoint WORKSTATION-042", reportUrl: "", count: 1, askedAnalysis: true, finished: false },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000023", sourceTool: "ModSecurity", timestamp: "2026-03-06T08:10:02Z", severity: 0.81, description: "Path traversal attempt: GET /../../etc/shadow on web gateway", reportUrl: "https://reports.example.com/r/023", count: 2, askedAnalysis: true, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000024", sourceTool: "Suricata", timestamp: "2026-03-06T06:55:47Z", severity: 0.35, description: "Unusual ICMP traffic pattern from 10.0.5.20 — possible ping sweep", reportUrl: "", count: 1, askedAnalysis: false, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000025", sourceTool: "Zeek", timestamp: "2026-03-06T05:40:33Z", severity: 0.63, description: "HTTP traffic to known phishing domain login-secure-update.xyz", reportUrl: "https://reports.example.com/r/025", count: 3, askedAnalysis: false, finished: false },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000026", sourceTool: "ClamAV", timestamp: "2026-03-06T04:25:19Z", severity: 0.88, description: "Ransomware signature Ransom.WannaCry detected in email attachment", reportUrl: "https://reports.example.com/r/026", count: 1, askedAnalysis: true, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000027", sourceTool: "Trivy", timestamp: "2026-03-06T03:10:05Z", severity: 0.15, description: "Low severity CVE-2025-5555 in libexpat dependency", reportUrl: "", count: 9, askedAnalysis: false, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000028", sourceTool: "Snort", timestamp: "2026-03-06T01:55:48Z", severity: 0.70, description: "Brute force attack detected on RDP service 10.0.1.5:3389", reportUrl: "https://reports.example.com/r/028", count: 230, askedAnalysis: true, finished: false },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000029", sourceTool: "Falco", timestamp: "2026-03-06T00:40:31Z", severity: 0.52, description: "Shell spawned inside container api-gateway with unexpected args", reportUrl: "", count: 2, askedAnalysis: false, finished: true },
  { id: "a1b2c3d4-1111-4a1b-8c1d-000000000030", sourceTool: "Wazuh", timestamp: "2026-03-05T23:25:17Z", severity: 0.40, description: "New user account 'svc_backup' created on domain controller DC-01", reportUrl: "", count: 1, askedAnalysis: false, finished: false },
];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");
  const rowsParam = searchParams.get("rows");
  const latestFirst = searchParams.has("lf");

  let filtered = [...mockEvents];

  if (startParam) {
    const startDate = new Date(startParam).getTime();
    filtered = filtered.filter((e) => new Date(e.timestamp).getTime() >= startDate);
  }
  if (endParam) {
    const endDate = new Date(endParam).getTime();
    filtered = filtered.filter((e) => new Date(e.timestamp).getTime() <= endDate);
  }

  filtered.sort((a, b) => {
    const diff = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    return latestFirst ? -diff : diff;
  });

  const rows = rowsParam ? Math.max(1, parseInt(rowsParam, 10)) : 10;
  filtered = filtered.slice(0, rows);

  return NextResponse.json(filtered);
}
