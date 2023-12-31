import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";
import { ProjectStatus } from "../../api/projects.types";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });

    it("shows correct badges status and color", () => {
      const statusNames = {
        [ProjectStatus.info]: "stable",
        [ProjectStatus.warning]: "warning",
        [ProjectStatus.error]: "critical",
      };

      const statusColors = {
        [ProjectStatus.info]: "rgb(2, 122, 72)",
        [ProjectStatus.warning]: "rgb(181, 71, 8)",
        [ProjectStatus.error]: "rgb(180, 35, 24)",
      };

      cy.get("main")
        .find("li")
        .each(($el, index) => {
          const statusName = mockProjects[index].status as ProjectStatus;
          cy.wrap($el)
            .contains(capitalize(statusNames[statusName]))
            .and("have.css", "color", statusColors[statusName]);
        });
    });
  });
});
