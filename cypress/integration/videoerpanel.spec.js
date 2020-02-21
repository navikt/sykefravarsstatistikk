context('VideoPanel', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/sykefravarsstatistikk');
    });

    it("cy.go() - åpne eksterne lenke i nye faner", () => {
        cy.get('.videoerpanel__lenke')
            .click();
        cy.get('.videoerpanel__lenke')
            .click();
    });
});
