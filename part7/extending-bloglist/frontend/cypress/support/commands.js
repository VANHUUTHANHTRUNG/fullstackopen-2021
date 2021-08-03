const backUrl = 'http://localhost:3003'
const frontUrl = 'http://localhost:3000'

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${backUrl}/api/login`, { username, password }).then(
    ({ body }) => {
      localStorage.setItem('loggedBloglistUser', JSON.stringify(body))
      cy.visit(frontUrl)
    }
  )
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  const request = {
    url: `${backUrl}/api/blogs`,
    method: 'POST',
    body: {
      title,
      author,
      url,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBloglistUser')).token
      }`,
    },
  }
  cy.request(request)
  cy.visit(`${frontUrl}`)
})

Cypress.Commands.add('createLikedBlog', ({ title, author, url, likes }) => {
  const request = {
    url: `${backUrl}/api/blogs`,
    method: 'POST',
    body: {
      title,
      author,
      url,
      likes,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBloglistUser')).token
      }`,
    },
  }
  cy.request(request)
  cy.visit(`${frontUrl}`)
})

Cypress.Commands.add('getByTestID', (id, ...args) => {
  return cy.get(`[data-testid=${id}]`, ...args)
})
