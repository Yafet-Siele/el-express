import express from "express";
import { Resend } from "resend";
import Lead from "../models/Lead.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, service, message } = req.body;

    // ── Validate required fields ──
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    // ── Save to MongoDB ──
    await Lead.create({ name, email, phone, service, message });
    console.log(`✅ Lead saved: ${name} <${email}>`);

    // ── Confirmation email to client ──
    const clientEmail = await resend.emails.send({
      from:    process.env.RESEND_FROM,
      to:      email,
      subject: "We got your message — EL Express",
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#0e0e0e;color:#fff;padding:48px 40px;">
          <div style="font-size:22px;font-weight:900;letter-spacing:4px;text-transform:uppercase;margin-bottom:32px;">
            EL Express
          </div>
          <h1 style="font-size:28px;font-weight:800;margin:0 0 16px;text-transform:uppercase;">
            Thanks, ${name}.
          </h1>
          <p style="font-size:15px;color:#888;line-height:1.8;margin:0 0 24px;">
            We've received your message and will get back to you within the hour.
          </p>
          <div style="border:1px solid #222;padding:24px;margin-bottom:32px;">
            ${service ? `<p style="color:#555;text-transform:uppercase;font-size:13px;">Service</p><p style="color:#ccc;">${service}</p>` : ""}
            ${phone   ? `<p style="color:#555;text-transform:uppercase;font-size:13px;">Phone</p><p style="color:#ccc;">${phone}</p>` : ""}
            <p style="color:#555;text-transform:uppercase;font-size:13px;">Message</p>
            <p style="color:#ccc;line-height:1.7;">${message}</p>
          </div>
          <p style="font-size:13px;color:#444;">— The EL Express Team</p>
        </div>
      `,
    });

    if (clientEmail.error) {
      console.error("❌ Client email failed:", clientEmail.error);
    } else {
      console.log(`✅ Client email sent to ${email} — ID: ${clientEmail.data?.id}`);
    }

    // ── Lead notification to you ──
    const leadEmail = await resend.emails.send({
      from:    process.env.RESEND_FROM,
      to:      process.env.MY_EMAIL,
      subject: `New Lead: ${name} — ${service || "General Inquiry"}`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;color:#111;padding:40px;">
          <h1 style="font-size:26px;font-weight:800;margin:0 0 24px;">${name}</h1>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:10px 0;color:#999;width:100px;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            ${phone   ? `<tr><td style="padding:10px 0;color:#999;">Phone</td><td><a href="tel:${phone}">${phone}</a></td></tr>` : ""}
            ${service ? `<tr><td style="padding:10px 0;color:#999;">Service</td><td>${service}</td></tr>` : ""}
            <tr><td style="padding:10px 0;color:#999;vertical-align:top;">Message</td><td style="line-height:1.7;">${message}</td></tr>
          </table>
          <div style="margin-top:32px;padding:16px;background:#f9f9f9;font-size:11px;color:#999;">
            Submitted ${new Date().toLocaleString("en-CA", { timeZone: "America/Edmonton" })} MST
          </div>
        </div>
      `,
    });

    if (leadEmail.error) {
      console.error("❌ Lead email failed:", leadEmail.error);
    } else {
      console.log(`✅ Lead email sent to ${process.env.MY_EMAIL} — ID: ${leadEmail.data?.id}`);
    }

    // ── Respond to frontend ──
    if (clientEmail.error || leadEmail.error) {
      return res.status(500).json({ 
        error: "Lead saved but email delivery failed.", 
        details: { clientEmail: clientEmail.error, leadEmail: leadEmail.error } 
      });
    }

    res.json({ success: true });

  } catch (err) {
    console.error("❌ Contact error:", err);
    res.status(500).json({ error: "Something went wrong.", details: err.message });
  }
});

export default router;