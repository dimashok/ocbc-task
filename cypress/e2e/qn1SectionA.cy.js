describe("Web Automation Section A", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
  });

  it("1. Basic Auth", () => {
    cy.visit("https://admin:admin@the-internet.herokuapp.com/basic_auth");

    cy.contains("Congratulations! You must have the proper credentials.");
  });

  it("2. A/B Testing", () => {
    // I don't understand this one, as nothing happen on the app heroku
  });

  it("3. Broken images", () => {
    cy.visit("https://the-internet.herokuapp.com/broken_images");

    cy.get('img[src="asdf.jpg"]').should($img =>
      expect($img[0].naturalWidth).to.eq(0)
    );
    cy.get('img[src="hjkl.jpg"]').should($img =>
      expect($img[0].naturalWidth).to.eq(0)
    );
  });

  it("4. Checkboxes", () => {
    cy.visit("https://the-internet.herokuapp.com/checkboxes");
    cy.get("input:eq(0)").check();
    cy.get("input:eq(1)").uncheck();
    cy.get("input:eq(0)").should("be.checked");
    cy.get("input:eq(1)").should("not.be.checked");
  });

  it.only("5. Drag and drop", () => {
    cy.visit("https://the-internet.herokuapp.com/drag_and_drop");

    cy.get(".column:eq(0)")
      .trigger("mousedown")
      .trigger("mousemove", { pageX: 600, pageY: 0 })
      .trigger("mouseup");

    // cy.get(".column:eq(0)").then(el => {
    //   if (el) {
    //     cy.wrap(el).trigger("dragstart");
    //     cy.get(".column:eq(1)").trigger("drop");
    //   }
    // });

    // cy.get(".column:eq(0)")
    //   .drag(".column:eq(1)", {
    //     force: true
    //   })
    //   .then(success => {
    //     assert.isFalse(success);
    //   });
  });

  it("6. Dropdown", () => {
    cy.visit("https://the-internet.herokuapp.com/dropdown");
    cy.get("select").select("1");
    cy.get('[value="1"').should("be.selected");

    cy.get("select").select("2");
    cy.get('[value="2"').should("be.selected");
  });

  it("7. File Download", () => {
    // I can only find the way to test Download by using Cypress Plugin cypress-downloadfile
    cy.downloadFile(
      "https://the-internet.herokuapp.com/download/preprod.json",
      "downloads",
      "preprod.json"
    );

    // verifying the file is downloaded
    cy.readFile("cypress\\downloads\\preprod.json");
  });

  it("8. File Upload", () => {
    cy.intercept("GET", "https://the-internet.herokuapp.com/upload").as(
      "waitUploadComplete"
    );
    cy.visit("https://the-internet.herokuapp.com/upload");
    cy.get("#file-upload").selectFile("cypress/fixtures/sampleImg.jpeg");
    cy.wait("@waitUploadComplete")
      .its("response.statusCode")
      .should("eq", 200);

    cy.get('[value="Upload"]').click();

    cy.contains("File Uploaded!").should("be.visible");
  });

  it("9. Forgot Password", () => {
    cy.visit("https://the-internet.herokuapp.com/forgot_password");
    cy.get('[name="email"]').type("sample_email@gmail.com");
    cy.get('[type="submit"]').click();

    cy.get('[name="email"]').should("not.exist");
    cy.get('[type="submit"]').should("not.exist");
  });

  it("10. Notification Message", () => {
    cy.visit("https://the-internet.herokuapp.com/notification_message");
    cy.url().should("include", "_rendered");

    cy.get('[id="flash-messages"]').should("be.visible");
    cy.get('a[href="/notification_message"]').click();
    cy.get('[id="flash-messages"]').should("be.visible");
  });
});
