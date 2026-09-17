import {test, expect} from '@playwright/test';

test('GET Users list returns 200, body data equal to 2', async ({request}) => {
    const response = await request.get('https://reqres.in/api/users/2');
    expect(response.status()).toBe(200);
  
    const body = await response.json();
    expect(body.data.id).toBe(2);
  });



test('PUT Update data, Status 200 and match data after update, ', async ({request}) => {
    const response = await request.put('https://reqres.in/api/users/2', { 
        data: { 
            name: 'jarg03',
            job: 'Senior QA'
        }
    })

    expect(response.status()).toBe(200);
  
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

      expect(body.name).toBe("jarg03");
    });



test('DELETE validate returns 204', async ({request}) => {
        const response = await request.delete('https://reqres.in/api/users/2');
        expect(response.status()).toBe(204);
      
    });



test('GET Not existing user returns 404', async ({request}) => {
        const response = await request.get('https://reqres.in/api/users/9999');
        expect(response.status()).toBe(404);
      
      });


test('GET invalid endpoint', async ({request}) => {
        const response = await request.get('https://reqres.in/api/unknown/23');
        expect(response.status()).toBe(404);
      
      });