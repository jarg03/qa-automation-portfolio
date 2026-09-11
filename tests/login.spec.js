import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
 let loginPage; 

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page); 
    await loginPage.goto();
  });

  test('login exitoso con credenciales válidas', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('/inventory.html');
  });

  test('login falla con contraseña incorrecta', async ({ page }) => {
    await loginPage.login('standard_user','contraseña_incorrecta');
    await expect(loginPage.errorMessage).toBeVisible(); 
  });

  test('login falla con usuario bloqueado', async ({ page }) => {
    await loginPage.login('locked_out_user','secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible(); 
  });

}); 