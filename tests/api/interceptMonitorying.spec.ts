import {test,expect} from '@playwright/test';

test('intercpet monitoring',async ({page})=>{


    await page.route('**/v2/pet/**', async route =>{

         let request = route.request();
         console.log("request url - " + request.url());
         console.log("request method - " + request.method());
         console.log("request headers - " + JSON.stringify(request.headers()));
         console.log("request post data - " + request.postData());

         await route.continue();

    });
    await page.goto('https://petstore.swagger.io/v2/pet/75');

})


//mocking the response


test('mock teh respones', async ({page})=>{



    await page.route('**/api/users', async route =>{
    await route.fulfill({

        status:200,
        contentType:'application/json',
        json: [
            {id:101,name:'Ravi',Role:'QA'},
             {id:102,name:'Mohan',Role:'Developer'}
        ]
    });


// await page.route('**/api/users/1000', async route =>{
//     await route.fulfill({


//           status:404,
//           json:{message:'user not found in application'}

//     });


    // await page.goto('https://reqres.in/api/users')

    // await expect(page.getByText('Ravi')).toBeVisible();

    await page.goto('https://reqres.in/api/users');


    })






})



test('Modify request sent to server', async ({ page }) => {
  await page.route('**/api/users', async route => {
    const request = route.request();

    if (request.method() === 'POST') {
      const postData = request.postDataJSON();

      console.log('Original post data:', postData);

      // Modify the request body before sending it to the server.
      postData.name = 'Ravi Kumar';
      postData.job = 'QA';

      console.log('Modified post data:', postData);

      await route.continue({
        postData: JSON.stringify(postData),
        headers: {
          ...request.headers(),
          'content-type': 'application/json'
        }
      });

      return;
    }

    // Continue GET and other requests.
    await route.continue();
  });

  // Open the website to establish the browser's origin.
  await page.goto('https://reqres.in', {
    waitUntil: 'domcontentloaded'
  });

  // Send a POST request from the browser so page.route intercepts it.
  const result = await page.evaluate(async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Priyanka',
        job: 'QA Lead'
      })
    });

    return {
      status: response.status,
      body: await response.text()
    };
  });

  console.log('Response status:', result.status);
  console.log('Response body:', result.body);

  expect(result.status, result.body).toBe(201);

  const responseBody = JSON.parse(result.body);

  // Validate that the API response contains the modified values.
  expect(responseBody.name).toBe('Ravi Kumar');
  expect(responseBody.job).toBe('QA');
});



test('abort the request', async ({ page }) => {
  await page.route('**/api/users/3000', async route => {
    await route.abort('failed');
  });

  const navigationError = await page
    .goto('https://reqres.in/api/users/3000')
    .catch((error) => error);

  expect(navigationError).toBeTruthy();
});




    //modifying the response
    //api => server => response =>  modify =>  UI 

    //using method fetch 

test('modify the real API response', async ({ page }) => {
  await page.route('**/api/users', async route => {
    const realResponse = await route.fetch();
    const realData = await realResponse.json();

    realData.data.push({
      id: 999,
      email: 'playwright@test.com',
      first_name: 'Playwright',
      last_name: 'Test User',
      avatar: 'https://example.com/avatar.png'
    });

    await route.fulfill({
      status: realResponse.status(),
      headers: {
        ...realResponse.headers(),
        'content-type': 'application/json'
      },
      body: JSON.stringify(realData)
    });
  });

  const response = await page.goto('https://reqres.in/api/users');

  expect(response?.status()).toBe(200);
  await expect(page.locator('body')).toContainText('Playwright');
  await expect(page.locator('body')).toContainText('Test User');
});



 





