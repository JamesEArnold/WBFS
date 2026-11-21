import { expect, test } from '@playwright/test';

/**
 * The SendGrid signup forms must keep working through the framework upgrade and
 * CMS migration. SendGrid itself is stubbed: we assert on what the form sends
 * to our API route and on what the visitor sees.
 */

test('email signup submits the address and thanks the visitor', async ({ page }) => {
  let body: unknown;
  await page.route('**/mailingList', async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ json: { message: 'Thank you for supporting Weisburn For Sheriff! 👋' } });
  });

  await page.goto('/');
  const form = page
    .locator('form', { has: page.getByPlaceholder('Email address') })
    .filter({ hasNot: page.getByPlaceholder('First Name') });

  await form.getByPlaceholder('Email address').fill('supporter@example.com');
  await form.locator('button[type="submit"]').click();

  await expect(page.getByText('Thank you for supporting Weisburn For Sheriff!')).toBeVisible();
  expect(body).toEqual({ mail: 'supporter@example.com' });
});

test('email signup rejects an invalid address without calling the API', async ({ page }) => {
  let called = false;
  await page.route('**/mailingList', async (route) => {
    called = true;
    await route.fulfill({ json: { message: 'unexpected' } });
  });

  await page.goto('/');
  const form = page
    .locator('form', { has: page.getByPlaceholder('Email address') })
    .filter({ hasNot: page.getByPlaceholder('First Name') });
  await form.getByPlaceholder('Email address').fill('not-an-email');
  await form.locator('button[type="submit"]').click();

  // Current live behavior: zod's default message from the first .email() check.
  await expect(form.getByText('Invalid email')).toBeVisible();
  await expect(form.getByPlaceholder('Email address')).toHaveAttribute('aria-invalid', 'true');
  expect(called).toBe(false);
});

test('volunteer signup shows address fields for a yard sign and submits them', async ({ page }) => {
  let body: Record<string, unknown> | undefined;
  await page.route('**/volunteerList', async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ json: { message: 'Thank you for volunteering!' } });
  });

  await page.goto('/');
  const form = page.locator('#volunteer form');

  // Address fields only appear once a yard sign is requested.
  await expect(form.getByPlaceholder('Street Address')).toHaveCount(0);

  await form.getByPlaceholder('First Name').fill('Pat');
  await form.getByPlaceholder('Last Name').fill('Supporter');
  await form.getByPlaceholder('Email address').fill('pat@example.com');
  await form.getByPlaceholder('Phone Number').fill('330 555 1234');
  await form.getByLabel("I'd like a yard sign").click();

  await form.getByPlaceholder('Street Address').fill('123 Main St');
  await form.getByPlaceholder('City').fill('Canton');
  await form.getByPlaceholder('Zip Code').fill('44720');
  await form.locator('button[type="submit"]').click();

  await expect(page.getByText('Thank you for volunteering!')).toBeVisible();
  expect(body).toMatchObject({
    mail: 'pat@example.com',
    first_name: 'Pat',
    last_name: 'Supporter',
    yardsign: true,
    address_line_1: '123 Main St',
    city: 'Canton',
    postal_code: '44720',
  });
});
