import { test, expect } from '@playwright/test';

test.describe('Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login exitoso con credenciales válidas', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/inventory.html');
  });

  test('login falla con contraseña incorrecta', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('contraseña_incorrecta');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible(); 
  });

  test('login falla con usuario bloqueado', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible(); 
  });

}); 