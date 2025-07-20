
// Send job application info to company email using Web3Forms
// https://web3forms.com/platforms/nextjs-contact-form
export async function sendJobApplicationNotification({
  recruiterEmail,
  recruiterName,
  applicantName,
  applicantEmail,
  jobTitle,
  jobId,
  coverLetter
}) {
  try {
    const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;
    if (!WEB3FORMS_ACCESS_KEY) {
      throw new Error('Web3Forms access key not set');
    }
    const formData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Application for ${jobTitle}`,
      from_name: applicantName,
      from_email: applicantEmail,
      to: recruiterEmail,
      message: `A new job application has been received.\n\nJob Title: ${jobTitle}\nJob ID: ${jobId}\n\nApplicant Name: ${applicantName}\nApplicant Email: ${applicantEmail}\n\nCover Letter: ${coverLetter || ''}`,
    };
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      return { success: true, message: 'Application email sent via Web3Forms.' };
    } else {
      return { success: false, error: data.message || 'Web3Forms error' };
    }
  } catch (error) {
    console.error('Error sending email via Web3Forms:', error);
    return { success: false, error: error.message };
  }
}
