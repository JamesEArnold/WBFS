import { NextRequest, NextResponse } from "next/server";
 
export async function PUT(request: NextRequest, res: NextResponse) {
  const req = await request.json();
  try {
    await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_SECRET}`,
      },
      body: JSON.stringify({
        contacts: [{ email: `${req.mail}` }],
        list_ids: [process.env.SENDGRID_MAILING_ID],
      },
    )});

    return NextResponse.json({
      message: "Thank you for supporting Weisburn For Sheriff! 👋",
    }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Oops, there was a problem with adding your email, please try again or contact us",
    }, {
      status: 500,
    });
  }
}

