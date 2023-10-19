import { NextRequest, NextResponse } from "next/server";

const buildCustomFields = (request: any) => {
  const result: Record<string, string> = {};

  if (request['tshirt']) {
    result['tshirt'] = 'true';
  }

  if (request['campaignevents']) {
    result['campaignevents'] = 'true';
  }

  if (request['parade']) {
    result['parade'] = 'true';
  }

  if (request['yardsign']) {
    result['yardsign'] = 'true';
  }

  if (request['knockdoors']) {
    result['knockdoors'] = 'true';
  }

  if (request['phonecalls']) {
    result['phonecalls'] = 'true';
  }

  if (request['about'] !== '') {
    result['about'] = request['about'];
  }

  return result;
  };

  const buildNonCustomFields = (request: any) => {
    const result: Record<string, string> = {};

    if (request['first_name'] !== '') {
      result['first_name'] = request['first_name'];
    } 
  
    if (request['last_name'] !== '') {
      result['last_name'] = request['last_name'];
    }
  
    if (request['phone_number'] !== '') {
      result['phone_number'] = request['phone_number'];
    }

    if (request['address_line_1'] !== '') {
      result['address_line_1'] = request['address_line_1'];
    }

    if (request['city'] !== '') {
      result['city'] = request['city'];
    }

    if (request['postal_code'] !== '') {
      result['postal_code'] = request['postal_code'];
    }

    return result;

  };
 
export async function PUT(request: NextRequest, res: NextResponse) {
  const req = await request.json();
  const customFields = buildCustomFields(req);
  const nonCustomFields = buildNonCustomFields(req);

  try {
    await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_SECRET}`,
      },
      body: JSON.stringify({
        contacts: [
          { 
            email: `${req.mail}`,
            ...nonCustomFields,
            "custom_fields": {
              ...customFields,
            },
          }],
        list_ids: [process.env.SENDGRID_VOLUNTEER_ID],
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

