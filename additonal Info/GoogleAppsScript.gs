const DESTINATION_EMAIL = "silentzeesh@gmail.com";
const SPREADSHEET_ID = "16jeymbM3pIKtMx4h4u8ucgQKrrB8blLasJXLDdARwb4";
const SHEET_NAME = "Responses";

function doGet(e) {
  return ContentService.createTextOutput("OK");
}

function doPost(e) {
  const data = e.parameter || {};
  const timestamp = new Date();
  const row = [
    timestamp.toISOString(),
    data.source || "",
    data.name || "",
    data.mobile || "",
    data.email || "",
    data.requirement || "",
    data.budget || "",
    data.message || "",
  ];

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Timestamp",
      "Source",
      "Name",
      "Mobile",
      "Email",
      "Requirement",
      "Budget",
      "Message",
    ]);
  }
  sheet.appendRow(row);

  const emailBody = buildEmailBody(data, timestamp);
  MailApp.sendEmail({
    to: DESTINATION_EMAIL,
    subject: "New enquiry from Contours Interio",
    htmlBody: emailBody,
  });

  return ContentService.createTextOutput(
    JSON.stringify({ status: "success" }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function buildEmailBody(data, timestamp) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1f1f1f;line-height:1.5;">
      <h2 style="margin-bottom:0.5rem;color:#2f2f2f;">New enquiry received</h2>
      <p><strong>Received:</strong> ${timestamp.toLocaleString()}</p>
      <p><strong>Source:</strong> ${escapeHtml(data.source || "Unknown")}</p>
      <p><strong>Name:</strong> ${escapeHtml(data.name || "—")}</p>
      <p><strong>Mobile:</strong> ${escapeHtml(data.mobile || "—")}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email || "—")}</p>
      <p><strong>Requirement:</strong> ${escapeHtml(data.requirement || "—")}</p>
      <p><strong>Budget:</strong> ${escapeHtml(data.budget || "—")}</p>
      <p><strong>Message:</strong><br>${escapeHtml(data.message || "—").replace(/\n/g, "<br>")}</p>
    </div>
  `;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
