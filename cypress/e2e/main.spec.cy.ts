describe("constructor + order + model", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should drop ingredients to constructor, make an order, close modal window", () => {
    cy.contains("Constructor");

    cy.get("[data-cy=bun]").first().trigger("dragstart");
    cy.get("[data-cy=dropArea]").trigger("drop");

    cy.get("[data-cy=ingr]").first().trigger("dragstart");
    cy.get("[data-cy=dropArea]").trigger("drop");

    cy.get("button").contains("Make an order").click();

    cy.get("[data-cy=email]").type("agressorrrrr@gmail.com");
    cy.get("[data-cy=pass]").type("agressorrrrr");
    cy.get("button").contains("Login").click();

    cy.get("button").contains("Make an order").click();

    cy.get("[data-cy=overlay]").should("exist");
    cy.get("[data-cy=closeButton]").click();
    cy.get("[data-cy=overlay]").should("not.exist");
  });

  it("should open and close modal window", () => {
    cy.contains("Constructor");

    cy.get("[data-cy=bun]").first().click();
    cy.get("[data-cy=overlay]").should("exist");
    cy.get("[data-cy=closeButton]").click();
    cy.get("[data-cy=overlay]").should("not.exist");
  });
});

export {};
