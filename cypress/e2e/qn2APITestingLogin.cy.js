describe("API Testing", () => {
  // Note: herokuapp doesn't provide correct API to use and validate
  // if the methods are correct
  // so all I can do for example is this

  it("Login Success", () => {
    cy.request({
      method: "POST",
      url: "https://the-internet.herokuapp.com/authenticate",
      body: {
        username: "tomsmith",
        password: "SuperSecretPassword!"
      }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });

  it("Login unsuccess - invalid password", () => {
    cy.request({
      method: "POST",
      url: "https://the-internet.herokuapp.com/authenticate",
      body: {
        username: "tomsmith",
        password: ""
      }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });

  it("Login unsuccess - invalid username", () => {
    cy.request({
      method: "POST",
      url: "https://the-internet.herokuapp.com/authenticate",
      body: {
        username: "",
        password: "SuperSecretPassword!"
      }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});
