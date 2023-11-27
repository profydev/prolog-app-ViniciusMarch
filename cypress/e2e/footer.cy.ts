import packageJson from "../../package.json";

describe("Footer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
      cy.wait(500);
    });

    it("list the items as links", () => {
      cy.get("footer").contains("Docs").should("have.attr", "href", "#");
      cy.get("footer").contains("API").should("have.attr", "href", "#");
      cy.get("footer").contains("Help").should("have.attr", "href", "#");
      cy.get("footer").contains("Community").should("have.attr", "href", "#");
    });

    it("renders the version dynamically from package.json", () => {
      const appVersion = packageJson.version;
      cy.get("footer").contains(`Version: ${appVersion}`);
    });

    it("renders elements on correct order", () => {
      cy.get("footer p").should("have.css", "order", "1");
      cy.get("footer ul").should("have.css", "order", "2");
      cy.get("footer div").should("have.css", "order", "3");
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
      cy.wait(500);
    });

    it("renders elements on correct order", () => {
      cy.get("footer ul")
        .should("have.css", "order", "0")
        .next("div")
        .should("have.css", "order", "0")
        .next("p")
        .should("have.css", "order", "0");
    });
  });
});
