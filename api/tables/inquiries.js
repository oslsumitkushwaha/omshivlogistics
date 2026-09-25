const { sql } = require("@vercel/postgres");

const REQUIRED_FIELDS = ["reference", "name", "phone", "from_city", "to_city"];
const MAX_LENGTH = 2000;

function text(value) {
  return typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "";
}

async function notifyByEmail(inquiry) {
  if (!process.env.RESEND_API_KEY || !process.env.ENQUIRY_FROM_EMAIL || !process.env.ENQUIRY_TO_EMAIL) return;

  const summary = [
    "New freight enquiry: " + inquiry.reference,
    "",
    "Name: " + inquiry.name,
    "Company: " + inquiry.company,
    "Phone: " + inquiry.phone,
    "Email: " + inquiry.email,
    "Service: " + inquiry.service,
    "Vehicle: " + inquiry.vehicle,
    "Route: " + inquiry.from_city + " to " + inquiry.to_city,
    "Pickup date: " + inquiry.pickup_date,
    "Load details: " + inquiry.load_details,
    "Message: " + inquiry.message
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.RESEND_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL,
      to: [process.env.ENQUIRY_TO_EMAIL],
      subject: "Freight enquiry " + inquiry.reference,
      text: summary
    })
  });

  if (!response.ok) throw new Error("Email provider returned HTTP " + response.status);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const inquiry = {
    reference: text(body.reference),
    name: text(body.name),
    company: text(body.company),
    phone: text(body.phone),
    email: text(body.email),
    service: text(body.service),
    vehicle: text(body.vehicle),
    from_city: text(body.from_city),
    to_city: text(body.to_city),
    load_details: text(body.load_details),
    pickup_date: text(body.pickup_date),
    message: text(body.message),
    source: text(body.source) || "landing-page-enquiry-form",
    status: text(body.status) || "new"
  };

  const missing = REQUIRED_FIELDS.filter((field) => !inquiry[field]);
  if (missing.length) {
    return res.status(400).json({ error: "Missing required fields", fields: missing });
  }

  try {
    const result = await sql`
      INSERT INTO inquiries (
        reference, name, company, phone, email, service, vehicle,
        from_city, to_city, load_details, pickup_date, message, source, status
      ) VALUES (
        ${inquiry.reference}, ${inquiry.name}, ${inquiry.company}, ${inquiry.phone},
        ${inquiry.email}, ${inquiry.service}, ${inquiry.vehicle}, ${inquiry.from_city},
        ${inquiry.to_city}, ${inquiry.load_details}, ${inquiry.pickup_date}, ${inquiry.message},
        ${inquiry.source}, ${inquiry.status}
      )
      RETURNING id, reference, created_at
    `;

    try {
      await notifyByEmail(inquiry);
    } catch (emailError) {
      console.error("Inquiry email notification failed", emailError);
    }

    return res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Inquiry persistence failed", error);
    return res.status(503).json({ error: "Enquiry storage is not configured" });
  }
};
