"use client"; 

// Next.js API Route for /api/jobs
export async function GET(request) {
  // Return jobs (replace with DB logic)
  return new Response(JSON.stringify({ jobs: [], pagination: {} }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    // Save job to DB here
    return new Response(JSON.stringify({ message: 'Job created', data: body }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create job' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
