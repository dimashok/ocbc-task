describe("Creating test cases for ruangmom.com homepage - Positive cases", () => {
  let random_email; // use random_email to bypass signup flow
  before(() => {
    let random_num = Math.floor(Math.random() * 1000000 + 1);

    random_email = `${random_num}_test@99.co`;
  });

  beforeEach(() => {
    cy.viewport("macbook-15");
    // Given I am in ruangmom.com homepage
    cy.visit("https://www.ruangmom.com");
    cy.get('[data-icon="close"]').click();
    cy.wait(1000);
  });

  it("Sign up flow", () => {
    // When I hit Sign up button
    cy.get('[href="/signup"]')
      .contains("Daftar")
      .click();

    // And the prompt page appear
    // And I click the sign up selection
    cy.wait(1000);
    cy.get('[type="button"]:eq(0)').click();

    // Then the signup form appears
    // And I can fill all forms
    cy.get('[id="form_daftar_email"]').type(random_email);
    cy.get('[id="form_daftar_password"]').type("testing2");
    cy.get('[id="form_daftar_confirm_password"]').type("testing2");
    cy.get('[id="form_daftar_nick_name"]').type("testing");
    cy.get('[id="form_daftar_status"] [value="5"]').click();

    // And I click Daftar
    cy.get('[type="submit"]').click();

    // And the page asked me to open email
    // And it means the sign up success
    cy.get('img[alt="Verifikasi e-mail mom!"]').should("be.visible");
  });

  it("Login flow", () => {
    // When I hit Login button
    cy.get('[href="/login"]')
      .contains("Masuk")
      .click();

    // Then the Login form appears
    // And I can fill all forms
    cy.get('[id="form_login_email"]').type("reniamel22@gmail.com");
    cy.get('[id="form_login_password"]').type("Rieuwpassa22");

    // And I click Masuk
    cy.get('[type="submit"]').click();

    // And I can login
    cy.get(".dropdown--profile").should("be.visible");
  });

  it("Open an article", () => {
    // When I click a headline article
    cy.get(".headline__link").click();

    // Then it will opened
    cy.url().should("include", "kecerdasan-anak-dari-mana.html");
  });

  it("Footer functionalities - Info section", () => {
    //When I scroll down the page
    cy.scrollTo("0%", "100%", { duration: 1000 });

    //And I click any items in Info section
    cy.get(".footer__title")
      .contains("Info")
      .parent()
      .find("ul>li:eq(0)")
      .click();

    //Then the page is opened
    cy.contains("SYARAT DAN KETENTUAN PENGGUNAAN LAYANAN").should("be.visible");
  });

  it("Page renderings", () => {
    cy.get(".headline")
      .should("exist")
      .and("be.visible");
    cy.get(".article")
      .should("exist")
      .and("be.visible");
    cy.get(".shorcut-calculator")
      .should("exist")
      .and("be.visible");
    cy.get(".birth--pregnancy")
      .should("exist")
      .and("be.visible");
    cy.get(".progress-permonth")
      .should("exist")
      .and("be.visible");
  });
});
