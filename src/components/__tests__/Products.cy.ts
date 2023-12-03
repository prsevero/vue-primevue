import Products from '../Products.vue'

describe('Products', () => {
  it('should mount', () => {
    cy.mount(Products)
    cy.get('.p-component.p-datatable').should('be.visible')
  })

  it('should has header', () => {
    cy.mount(Products)
    cy.get('.p-datatable-header').should('be.visible')
    cy.get('.datatable__header').should('be.visible')
    cy.get('.datatable__header > span').should('be.visible').and('have.text', 'Products')
    cy.get('.datatable__header > input').should('be.visible')
    cy.get('.datatable__header > button').should('be.visible').and('have.text', 'Clear search')
  })

  it('should not has search if displaySearch is false', () => {
    cy.mount(Products, { props: { displaySearch: false } })
    cy.get('.datatable__header > input').should('not.exist')
  })

  it('should has four columns', () => {
    cy.mount(Products)
    cy.get('.p-datatable-thead > tr > th').should(($th) => {
      expect($th).to.have.length(4)
    })
  })

  it('should all be resizable', () => {
    cy.mount(Products)
    cy.get('.p-datatable-thead > tr > th.p-resizable-column').should(($th) => {
      expect($th).to.have.length(4)
    })
  })

  it('should all be sortable', () => {
    cy.mount(Products)
    cy.get('.p-datatable-thead > tr > th.p-sortable-column').should(($th) => {
      expect($th).to.have.length(4)
    })
  })
})
