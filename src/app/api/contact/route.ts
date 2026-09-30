import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, layer, budget, timeline } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const leadData = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : null,
      company: company ? String(company).trim() : null,
      message: message ? String(message).trim() : '',
      layer: layer || 'Website',
      budget: budget || 'Undecided',
      timeline: timeline || 'Flexible',
      createdAt: new Date().toISOString(),
    };

    // Log the lead for server observability
    console.log('[SATR LEAD CAPTURED]', JSON.stringify(leadData, null, 2));

    // Optional webhook forwarding (e.g., Slack, Discord, Zapier, Make, CRM)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `**New SATR Project Inquiry**\n**Name:** ${leadData.name}\n**Email:** ${leadData.email}\n**Company:** ${leadData.company || 'N/A'}\n**Layer:** ${leadData.layer}\n**Budget:** ${leadData.budget}\n**Timeline:** ${leadData.timeline}\n**Message:** ${leadData.message || 'N/A'}`,
          }),
        });
      } catch (webhookErr) {
        console.error('[WEBHOOK ERROR]', webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully. SATR team will reply within 24 hours.',
      leadId: `satr_${Date.now()}`,
    });
  } catch (err: any) {
    console.error('[CONTACT API ERROR]', err);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please email hello@satr.tech directly.' },
      { status: 500 }
    );
  }
}
