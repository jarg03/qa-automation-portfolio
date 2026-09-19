import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('combined flow: validates user via API before login on UI @regression', async ({ page, request }) => {
  // PART 1 — API: confirming data before use it on UI
  const apiResponse = await request.get('https://reqres.in/api/users/2');
  expect(apiResponse.status()).toBe(200);

  const userData = await apiResponse.json();
  expect(userData.data.email).toContain('@reqres.in');

  // PART 2 — UI: proced with visual flow
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
  await expect(page).toHaveURL('/inventory.html');
});