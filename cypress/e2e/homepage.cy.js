/// <reference types="cypress" />

describe('Home page', () => {
  let user;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.visit('/');
  });

  it('should provide an ability to create an account', () => {
    cy.get('#signin2').click();
    cy.wait(1000);
    cy.get('#sign-username').type(user.username);
    cy.get('#sign-password').type(user.password);
    cy.contains('button', 'Sign up').click();

    cy.on('window:alert', (message) => {
      expect(message).to.equal('Sign up successful.');
    });
  });

  it('should provide an ability to log in', () => {
    cy.signUp(user);

    cy.get('#login2').click();
    cy.wait(1000);
    cy.get('#loginusername').type(user.username);
    cy.get('#loginpassword').type(user.password);
    cy.contains('button', 'Log in').click();

    cy.get('#nameofuser')
      .should('contain.text', `Welcome ${user.username}`);
  });

  it('should provide an ability to add a product to the cart', () => {
    const productName = 'Samsung galaxy s6';
    cy.contains('[class="hrefch"]', productName).click();
    cy.contains('[onclick="addToCart(1)"]', 'Add to cart').click();

    cy.on('window:alert', (message) => {
      expect(message).to.equal('Product added');
    });
    cy.get('#cartur').click();

    cy.get('.table-responsive')
      .should('contain.text', productName);
  });
});
