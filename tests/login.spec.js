import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
 let loginPage; 

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page); 
    await loginPage.goto();
  });

  test('Successful login', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('/inventory.html');
  });

const casosInvalidos = [
{
     description: 'Wrong password',
     username: 'standard_user',
     password: 'contraseña_incorrecta',
     errorMessage: 'Epic sadface: Username and password do not match any user in this service'

}, 
{
  description: 'Blocked user',
  username: 'locked_out_user',
  password: 'secret_sauce',
  errorMessage: 'Epic sadface: Sorry, this user has been locked out.'

}
];

casosInvalidos.forEach(({description, username, password, errorMessage}) => {
  test(`Login fails with ${description}`, async ({ page }) => {
  await loginPage.login(username, password);
  await expect(page.getByText(errorMessage)).toBeVisible();
  });


  });
});

