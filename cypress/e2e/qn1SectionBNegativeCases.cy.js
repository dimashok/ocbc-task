describe("Creating test cases for ruangmom.com homepage - Negative cases", () => {
  // I focused on signup flow in negative cases as it's rich of that

  beforeEach(() => {
    // Given I am in ruangmom.com homepage
    cy.visit("https://www.ruangmom.com");
    cy.get('[data-icon="close"]').click();
    cy.wait(1000);
  });

  it("Sign up - all forms are empty", () => {
    // When I hit Sign up button
    cy.get('[href="/signup"]')
      .contains("Daftar")
      .click();

    // And the prompt page appear
    // And I click the sign up selection
    cy.wait(1000);
    cy.get('[type="button"]:eq(0)').click();

    // Then I can see the form
    // And I click Daftar
    // And errors are displayed
    cy.get('[type="submit"]').click();
    cy.contains("Email Salah").should("be.visible");
    cy.contains("Kata Sandi Salah", { multiple: true }).should("be.visible");
    cy.contains("Nama panggilan harus di isi").should("be.visible");
    cy.contains("Pilih status Mom saat ini").should("be.visible");
  });

  it("Sign up - empty email", () => {
    // When I hit Sign up button
    cy.get('[href="/signup"]')
      .contains("Daftar")
      .click();

    // And the prompt page appear
    // And I click the sign up selection
    cy.wait(1000);
    cy.get('[type="button"]:eq(0)').click();

    // Then I can see the form
    // And I fill forms expect email
    cy.get('[id="form_daftar_password"]').type("testing2");
    cy.get('[id="form_daftar_confirm_password"]').type("testing2");
    cy.get('[id="form_daftar_nick_name"]').type("testing");
    cy.get('[id="form_daftar_status"] [value="5"]').click();

    // And I click Daftar
    // And error on email empty displayed
    cy.get('[type="submit"]').click();
    cy.contains("Email Salah").should("be.visible");

    // cy.contains("Kata Sandi Salah", { multiple: true }).should("be.visible");
    // cy.contains("Nama panggilan harus di isi").should("be.visible");
    // cy.contains("Pilih status Mom saat ini").should("be.visible");
  });

  it("Sign up - empty password", () => {
    // When I hit Sign up button
    cy.get('[href="/signup"]')
      .contains("Daftar")
      .click();

    // And the prompt page appear
    // And I click the sign up selection
    cy.wait(1000);
    cy.get('[type="button"]:eq(0)').click();

    // Then I can see the form
    // And I fill forms expect password
    cy.get('[id="form_daftar_email"]').type("test@gmail.com");
    cy.get('[id="form_daftar_nick_name"]').type("testing");
    cy.get('[id="form_daftar_status"] [value="5"]').click();

    // And I click Daftar
    // And error on password empty displayed
    cy.get('[type="submit"]').click();
    // cy.contains("Email Salah").should("be.visible");

    cy.contains("Kata Sandi Salah", { multiple: true }).should("be.visible");
    // cy.contains("Nama panggilan harus di isi").should("be.visible");
    // cy.contains("Pilih status Mom saat ini").should("be.visible");
  });

  it("Sign up - empty nickname", () => {
    // When I hit Sign up button
    cy.get('[href="/signup"]')
      .contains("Daftar")
      .click();

    // And the prompt page appear
    // And I click the sign up selection
    cy.wait(1000);
    cy.get('[type="button"]:eq(0)').click();

    // Then I can see the form
    // And I fill forms expect nicname
    cy.get('[id="form_daftar_email"]').type("test@gmail.com");
    cy.get('[id="form_daftar_password"]').type("testing2");
    cy.get('[id="form_daftar_confirm_password"]').type("testing2");
    cy.get('[id="form_daftar_status"] [value="5"]').click();

    // And I click Daftar
    // And error on email empty displayed
    cy.get('[type="submit"]').click();
    // cy.contains("Email Salah").should("be.visible");

    // cy.contains("Kata Sandi Salah", { multiple: true }).should("be.visible");
    cy.contains("Nama panggilan harus di isi").should("be.visible");
    // cy.contains("Pilih status Mom saat ini").should("be.visible");
  });

  it("Sign up - wrong email format", () => {
    // When I hit Sign up button
    cy.get('[href="/signup"]')
      .contains("Daftar")
      .click();

    // And the prompt page appear
    // And I click the sign up selection
    cy.wait(1000);
    cy.get('[type="button"]:eq(0)').click();

    // Then I can see the form
    // And I fill forms expect nicname
    cy.get('[id="form_daftar_email"]').type("test@gmail");
    cy.get('[id="form_daftar_password"]').type("testing2");
    cy.get('[id="form_daftar_confirm_password"]').type("testing2");
    cy.get('[id="form_daftar_nick_name"]').type("testing");
    cy.get('[id="form_daftar_status"] [value="5"]').click();

    // And I click Daftar
    // And error on wrong email format is displayed
    cy.get('[type="submit"]').click();
    cy.contains("Format email tidak valid!").should("be.visible");
  });
});
