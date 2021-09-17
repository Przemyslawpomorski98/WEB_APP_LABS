/// <reference types="cypress" />

describe('Notes E2E Test', () => {

  it('Should add note without tag', () => {
    const noteTitle = 'Title';
    const noteDescription = 'Description';

    cy.get('#add-note').click()

    cy.get('#modal')
      .should('be.visible')
      .should('have.class', 'modal--visible')

    cy.get('#note-title')
      .type(noteTitle)
      .should('have.value', noteTitle)

    cy.get('#note-content')
      .type(noteDescription)
      .should('have.value', noteDescription)

    cy.get('button').contains('Save').click()

    cy.wait(2000)

    cy.get('.note').last()
      .should('be.visible')
      .should('contain', noteTitle)
      .should('contain', noteDescription)
      .within(() => {
        cy.get('.note-tags > li')
          .should('not.exist')

        cy.get('.note-remove').click()
      })
  })

  it('Should add note with tag and check searching by tag', () => {
    const noteTitle = 'Title2';
    const noteDescription = 'Description2';
    const noteTag = 'Cypress Tag';

    cy.get('#add-note').click()

    cy.get('#modal')
      .should('be.visible')
      .should('have.class', 'modal--visible')

    cy.get('#note-title')
      .type(noteTitle)
      .should('have.value', noteTitle)

    cy.get('#note-content')
      .type(noteDescription)
      .should('have.value', noteDescription)

    cy.get('#note-newTag')
      .type(noteTag)
      .should('have.value', noteTag)

    cy.get('#add-tag').click()

    cy.wait(1000)

    cy.get('#current-tags > .tag').should('exist')

    cy.get('button').contains('Save').click()

    cy.wait(2000)

    cy.get('#toolbarTags').within(() => {
      cy.contains(noteTag).click()
    })

    cy.wait(2000)

    cy.get('.note').last()

    cy.get('.note').last()
      .should('be.visible')
      .should('contain', noteTitle)
      .should('contain', noteDescription)
      .within(() => {
        cy.get('.note-tags > li')
          .should('be.visible')
          .should('contain', noteTag)

        cy.get('.note-remove').click()
      })

  })

  it('Should search a note', () => {
    cy.get('#search')
      .type('Title')
      .wait(2000)

    cy.get('.note:visible').each( ($el, i, $list) => {
      cy.get('.note:visible')
        .eq(i)
        .should('contain', 'Title')
    })
  })

})
