describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit ('./src/index.html')

  })
    it ('verifica o título da aplicação', () => {
     cy.title ().should ('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

    it ('preenche os campos obrigatórios e envia o formulário', () => {
      cy.get('#firstName').type('Teste')
      cy.get('#lastName').type('Teste2')
      cy.get('#email').type('Teste@teste.com.br')
      cy.get('#product').select('Mentoria')
      cy.get('#open-text-area').type('Teste Feedback curso de testes automatizados', {delay: 100})
      cy.get('button[type="submit"]').click()
      cy.get('.success').should('be.visible')
    })

    it ('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
      cy.get('#firstName').type('Teste')
      cy.get('#lastName').type('Teste2')
      cy.get('#email').type('Teste')
      cy.get('#product').select('Mentoria')
      cy.get('#open-text-area').type('Teste Feedback curso de testes automatizados',)
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
    })
    it('Não deve permitir entrada de caracteres não numéricos no campo de telefone', () => {
      cy.get('#phone').type('abc!@#').should('have.value', '') // O campo deve continuar vazio
      cy.get('#phone').type('123abc456').should('have.value', '123456') // Apenas os números devem ser aceitos
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('#firstName').type('Teste')
      cy.get('#lastName').type('Teste2')
      cy.get('#email').type('Teste@teste.com.br')
      cy.get('#product').select('Mentoria')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Teste Feedback curso de testes automatizados',)
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      cy.get('#firstName').type('Teste').should('have.value', 'Teste').clear().should('have.value', '')
      cy.get('#lastName').type('Teste2').should('have.value', 'Teste2').clear().should('have.value', '')
      cy.get('#email').type('Teste@teste.com.br').should('have.value', 'Teste@teste.com.br').clear().should('have.value', '')
      cy.get('#product').select('Mentoria')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Teste Feedback curso de testes automatizados',).should('have.value', 'Teste Feedback curso de testes automatizados').clear().should('have.value', '')
      cy.contains('button','Enviar').click()
    })

    it('Envia o formulário com sucesso usando um comando customizado', () => {
      const data = {
        firstName: 'Teste',
        lastName: 'Teste Sobrenome',
        email: 'teste@teste.com.br',
        text: 'Teste.'
      }

      cy.fillMandatoryFieldsAndSubmit(data)
      cy.get('.success').should('be.visible')

    })
    it('Envia o formulário com sucesso usando um comando customizado com valores padrões setados no commands.js', () => {

      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
    })

    it('marca o tipo de atendimento Feedback', () => {

      cy.get('input[type="radio"]').check('feedback')
        .should('have.value', 'feedback')
    })
    
    it('marca cada tipo de atendimento', () => {

      cy.get('input[type="radio"]')
        .each(typeOfService => {
          cy.wrap(typeOfService)
            .check()
            .should('be.checked')
        })
    })

    it('seleciona um arquivo da pasta fixtures', () => {

      cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json')
        .should(input =>{
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {

      cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json', {action : 'drag-drop'})
        .should(input =>{
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a','Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
    })
})
