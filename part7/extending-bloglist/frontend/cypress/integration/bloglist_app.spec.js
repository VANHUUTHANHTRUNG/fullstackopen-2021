/* eslint-disable */
/// <reference types="cypress" />
/* eslint-enable */

describe('Bloglist app', function () {
  const backUrl = 'http://localhost:3003'
  const frontUrl = 'http://localhost:3000'
  const user = {
    username: 'hellas',
    name: 'Arto Hellas',
    password: 'artopassword',
  }
  const anotherUser = {
    username: 'mluukkai',
    name: 'Matti Luukkai',
    password: 'mattipassword',
  }

  beforeEach(function () {
    cy.request('POST', `${backUrl}/api/testing/reset`)
    cy.request('POST', `${backUrl}/api/users/`, user)
    cy.request('POST', `${backUrl}/api/users/`, anotherUser)
    cy.visit(frontUrl)
  })

  it('should show login form', function () {
    for (const part of ['Login form', 'Username', 'Password', 'Login'])
      cy.contains(part)
  })

  describe('Login function', function () {
    it('should succeed with correct credentials', function () {
      cy.getByTestID('login-btn').click()
      cy.getByTestID('username').type(user.username)
      cy.getByTestID('password').type(user.password)
      cy.getByTestID('submit-login-btn').click()
      cy.contains(`Current user: ${user.username}`)
    })

    it('should fail with incorrect credentials', function () {
      cy.getByTestID('login-btn').click()
      cy.getByTestID('username').type(user.username)
      cy.getByTestID('password').type('wrong password')
      cy.getByTestID('submit-login-btn').click()
      cy.getByTestID('error-message')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    const newBlog = {
      title: 'random title',
      author: 'random author',
      url: 'http://random.com',
    }

    beforeEach(function () {
      cy.login(user)
    })

    it('should be able to create blog', function () {
      cy.getByTestID('create-new-blog-btn').click()
      cy.getByTestID('author-input').type(newBlog.author)
      cy.getByTestID('title-input').type(newBlog.title)
      cy.getByTestID('url-input').type(newBlog.url)
      cy.getByTestID('submit-create-btn').click()

      cy.getByTestID('success-message')
        .should(
          'contain',
          `Blog with title ${newBlog.title} by ${newBlog.author} successfully added`
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains(`${newBlog.title} ${newBlog.author}`)
    })

    it('should be able to like a blog', function () {
      cy.createBlog(newBlog)
      cy.contains('view').click()
      cy.contains('likes : 0')
      cy.contains('like').click()
      cy.contains('likes : 1')
    })

    it('allows user to delete a post', function () {
      cy.createBlog(newBlog)
      cy.contains(`${newBlog.title} ${newBlog.author}`)

      cy.contains('view').click()
      cy.contains('remove').click()
      cy.getByTestID('success-message')
        .should(
          'contain',
          `Blog with title ${newBlog.title} by ${newBlog.author} successfully removed`
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains(`${newBlog.title} ${newBlog.author}`).should('not.exist')
    })

    it('should allow owner to delete a blog', function () {
      cy.createBlog(newBlog)
      cy.contains('Logout').click()
      cy.login(anotherUser)
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.getByTestID('error-message')
        .should('contain', 'Deleting permission denied')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it.only('orders blogs by likes', function () {
      const likedBlogs = [
        {
          title: 'blog 1',
          author: 'author 1',
          url: 'http://url1.com',
          likes: 1,
        },
        {
          title: 'blog 2',
          author: 'author 2',
          url: 'http://url2.com',
          likes: 2,
        },
        {
          title: 'blog 3',
          author: 'author 3',
          url: 'http://url3.com',
          likes: 3,
        },
      ]
      for (const blog of likedBlogs) cy.createLikedBlog(blog)
      cy.getByTestID('like').then((likeElements) => {
        const likes = likeElements.map((_i, el) =>
          Number(el.innerText.split(' : ')[1][0])
        )
        console.log(likes)
        for (let i = 0; i < likes.length - 1; i++)
          expect(likes[i] >= likes[i + 1]).to.be.true
      })
    })
  })
})
