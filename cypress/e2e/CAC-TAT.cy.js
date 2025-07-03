describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../../src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abdasdasdwgs', 10)

    cy.get('#firstName').type('Nicolas')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('nicolas@exemplo.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button','Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Nicolas')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('nicolas,exemplo.com')
    cy.get('#open-text-area').type('Excelente conteudo')
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone permanece vazio quando preenchido com valores não-numéricos', () => {
    cy.get('#phone')
      .should('have.value', '')
      .type('teste teste')
      
    cy.get('#phone').should('have.value', '')
  })

  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não e preenchido', () => {
    cy.get('#firstName').type('Nicolas')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('nicolas@exemplo.com')
    cy.get('#open-text-area').type('Excelente conteudo')
    cy.get('#phone-checkbox').click()
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
  })

   it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('Nicolas')
    .should('have.value', 'Nicolas')
    .clear()
    .should('have.value', '')

    cy.get('#lastName').type('Silva')
    .should('have.value', 'Silva')
    .clear()
    .should('have.value', '')

    cy.get('#email').type('nicolas@exemplo.com')
    .should('have.value', 'nicolas@exemplo.com')
    .clear()
    .should('have.value', '')

    cy.get('#phone').type('53999999999')
    .should('have.value', '53999999999')
    .clear()
    .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    // const data = {
    //   firstName: 'nicolas',
    //   lastName: 'Silva vespa',
    //   email: 'nicolas@exemplo.com',
    //   text: 'teste',
    // }
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

})

