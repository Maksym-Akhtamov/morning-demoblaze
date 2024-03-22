const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.demoblaze.com',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + randomNumber,
            password: '12345Qwert!'
          };
        }
      });
    }
  }
});
