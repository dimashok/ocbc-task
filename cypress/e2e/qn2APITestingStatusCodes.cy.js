describe("API Testing - Status Codes", () => {
  it("Status 200", () => {
    cy.request({
      method: "GET",
      url: "https://the-internet.herokuapp.com/status_codes/200"
    }).then(statusCode => {
      expect(statusCode.status).to.eq(200);
    });
  });

  it("Status 301", () => {
    cy.request({
      method: "GET",
      url: "https://the-internet.herokuapp.com/status_codes/301"
    }).then(statusCode => {
      expect(statusCode.status).to.eq(301);
    });
  });

  it("Status 404", () => {
    cy.request({
      method: "GET",
      url: "https://the-internet.herokuapp.com/status_codes/404",
      failOnStatusCode: false
    }).then(statusCode => {
      expect(statusCode.status).to.eq(404);
    });
  });

  it("Status 500", () => {
    cy.request({
      method: "GET",
      url: "https://the-internet.herokuapp.com/status_codes/500",
      failOnStatusCode: false
    }).then(statusCode => {
      expect(statusCode.status).to.eq(500);
    });
  });
});
