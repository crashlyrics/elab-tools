import nodemailer from "nodemailer";

function getMailConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;

  if (!host || !user || !pass || !from) {
    throw new Error("SMTP-Konfiguration ist unvollständig.");
  }

  return {
    host,
    port,
    user,
    pass,
    from,
  };
}

export async function sendMail({
  to,
  subject,
  text,
  html,
  attachments,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType: string;
  }>;
}) {
  const { host, port, user, pass, from } = getMailConfig();

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  const [agbResponse, widerrufResponse] = await Promise.all([
    fetch("https://www.elab.shop/agb"),
    fetch("https://www.elab.shop/widerruf"),
  ]);

  if (!agbResponse.ok || !widerrufResponse.ok) {
    throw new Error(
      "AGB oder Widerrufsbelehrung konnten nicht für die Vertragsbestätigung geladen werden."
    );
  }

  const [agbHtml, widerrufHtml] = await Promise.all([
    agbResponse.text(),
    widerrufResponse.text(),
  ]);

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
    attachments,
  });
}

type ContractPlan = "monthly" | "annual";

export async function sendContractConfirmation({
  to,
  plan,
  validUntil,
}: {
  to: string;
  plan: ContractPlan;
  validUntil: Date;
}) {
  const isAnnual = plan === "annual";

  const planName = isAnnual
    ? "elab Pro Jahreszugang"
    : "elab Pro Monatsabo";

  const price = isAnnual ? "25,00 €" : "2,50 €";

  const period = isAnnual
    ? "für 12 Monate"
    : "pro Monat";

  const contractText = isAnnual
    ? "Der Zugang endet nach zwölf Monaten automatisch und verlängert sich nicht automatisch."
    : "Das Monatsabo verlängert sich jeweils automatisch um einen weiteren Monat und kann zum Ende des laufenden Abrechnungszeitraums gekündigt werden.";

  const validUntilText = validUntil.toLocaleDateString("de-DE");

  const text = `
Vielen Dank für deine Bestellung bei elab.

Vertragsbestätigung

Tarif: ${planName}
Preis: ${price} ${period}
Pro-Zugang freigeschaltet bis: ${validUntilText}

${contractText}

Der Zugang ist deinem elab-Konto unter dieser E-Mail-Adresse zugeordnet:
${to}

Aktueller Leistungsumfang:
Zugriff auf die derzeit angebotenen Funktionen von elab Pro, insbesondere den PDF-Export.

AGB:
https://www.elab.shop/agb

Widerrufsbelehrung:
https://www.elab.shop/widerruf

Datenschutzerklärung:
https://www.elab.shop/datenschutz

Viele Grüße
elab.shop
`.trim();

  const [agbResponse, widerrufResponse] = await Promise.all([
    fetch("https://www.elab.shop/agb"),
    fetch("https://www.elab.shop/widerruf"),
  ]);

  if (!agbResponse.ok || !widerrufResponse.ok) {
    throw new Error(
      "AGB oder Widerrufsbelehrung konnten nicht für die Vertragsbestätigung geladen werden."
    );
  }

  const [agbHtml, widerrufHtml] = await Promise.all([
    agbResponse.text(),
    widerrufResponse.text(),
  ]);

  await sendMail({
    to,
    subject: `Vertragsbestätigung – ${planName}`,
    text,
    attachments: [
      {
        filename: "AGB-elab-Pro.html",
        content: agbHtml,
        contentType: "text/html; charset=utf-8",
      },
      {
        filename: "Widerrufsbelehrung-elab-Pro.html",
        content: widerrufHtml,
        contentType: "text/html; charset=utf-8",
      },
    ],
  });
}
