import { NextResponse } from "next/server";
import { Resend } from "resend";
import mongoose from "mongoose";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── MongoDB connection ──
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
}

// ── Lead schema ──
const LeadSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String },
  service:   { type: String },
  message:   { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

export async function POST(req) {
  try {
    const { name, email, phone, service, message } = await req.json();

    // ── 1. Save to MongoDB ──
    await connectDB();
    await Lead.create({ name, email, phone, service, message });

    // ── 2. Confirmation email to client ──
    await resend.emails.send({
      from:    process.env.RESEND_FROM,
      to:      email,
      subject: "We got your message — EL Express",
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#0e0e0e;color:#fff;padding:48px 40px;">
          <div style="font-size:22px;font-weight:900;letter-spacing:4px;text-transform:uppercase;margin-bottom:32px;">
            EL Express
          </div>
          <h1 style="font-size:28px;font-weight:800;margin:0 0 16px;text-transform:uppercase;letter-spacing:1px;">
            Thanks, ${name}.
          </h1>
          <p style="font-size:15px;color:#888;line-height:1.8;margin:0 0 24px;">
            We've received your message and will get back to you within the hour.
            Here's a summary of what you sent us:
          </p>
          <div style="border:1px solid #222;padding:24px;margin-bottom:32px;">
            ${service ? `<p style="margin:0 0 10px;font-size:13px;color:#555;text-transform:uppercase;letter-spacing:2px;">Service</p><p style="margin:0 0 20px;font-size:15px;color:#ccc;">${service}</p>` : ""}
            ${phone   ? `<p style="margin:0 0 10px;font-size:13px;color:#555;text-transform:uppercase;letter-spacing:2px;">Phone</p><p style="margin:0 0 20px;font-size:15px;color:#ccc;">${phone}</p>` : ""}
            <p style="margin:0 0 10px;font-size:13px;color:#555;text-transform:uppercase;letter-spacing:2px;">Message</p>
            <p style="margin:0;font-size:15px;color:#ccc;line-height:1.7;">${message}</p>
          </div>
          <p style="font-size:13px;color:#444;line-height:1.7;margin:0 0 8px;">
            Questions? Reply to this email or call us at +1 (403) 555-0199.
          </p>
          <p style="font-size:13px;color:#444;">— The EL Express Team</p>
          <div style="margin-top:40px;padding-top:24px;border-top:1px solid #1a1a1a;font-size:11px;color:#333;letter-spacing:2px;text-transform:uppercase;">
            Calgary, Alberta · elexpress.ca
          </div>
        </div>
      `,
    });

    // ── 3. Lead notification to you ──
    await resend.emails.send({
      from:    process.env.RESEND_FROM,
      to:      process.env.MY_EMAIL,
      subject: `New Lead: ${name} — ${service || "General Inquiry"}`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;color:#111;padding:40px;">
          <div style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#999;margin-bottom:24px;">
            New Lead · EL Express
          </div>
          <h1 style="font-size:26px;font-weight:800;margin:0 0 24px;">
            ${name}
          </h1>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#999;width:100px;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px;">Email</td>
              <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#111;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#999;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px;">Phone</td>
              <td style="padding:10px 0;"><a href="tel:${phone}" style="color:#111;">${phone}</a></td>
            </tr>` : ""}
            ${service ? `
            <tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#999;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px;">Service</td>
              <td style="padding:10px 0;">${service}</td>
            </tr>` : ""}
            <tr>
              <td style="padding:10px 0;color:#999;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px;vertical-align:top;">Message</td>
              <td style="padding:10px 0;line-height:1.7;">${message}</td>
            </tr>
          </table>
          <div style="margin-top:32px;padding:16px;background:#f9f9f9;font-size:11px;color:#999;letter-spacing:1px;">
            Submitted ${new Date().toLocaleString("en-CA", { timeZone: "America/Edmonton" })} MST
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}