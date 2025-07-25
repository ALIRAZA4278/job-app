import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Email request body:', body);
    
    const {
      to,
      subject,
      from_name,
      from_email,
      message
    } = body;
    if (!to || !subject || !from_name || !from_email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }
    

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Job:</strong> ${subject}</p>
        <p><strong>Applicant Name:</strong> ${from_name}</p>
        <p><strong>Applicant Email:</strong> ${from_email}</p>
        <pre style="font-family:inherit">${message}</pre>
      `
    });
    console.log('Email sent successfully: byresend', {
      to,
      subject,
      from_name,
      from_email,
      message
    });
    

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}