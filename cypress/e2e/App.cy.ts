// https://on.cypress.io/api

describe('App', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.get('.p-component.p-datatable').should('be.visible')
  })

  it('searches and clean correctly', () => {
    cy.visit('/')
    const input = cy.get('.datatable__header > input')
    input.should('be.visible')
    input.type('BD').should('have.value', 'BD')

    cy.get('.p-datatable-tbody > tr').then($th => {
        expect($th).to.have.length(2)
    })

    cy.get('.datatable__header > button').click();
    input.should('have.value', '');
  })
})
