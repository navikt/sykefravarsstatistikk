/// <reference types="cypress" />

context('VideoPanel', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/sykefravarsstatistikk');
    });

    it("cy.go() - åpne eksterne lenke i nye faner", () => {
        // https://on.cypress.io/go
        cy.get('#reduseringAvSykefravar')
            .click();
        cy.get('#forebyggeArbeidsmiljoet')
            .click();
    });
});
