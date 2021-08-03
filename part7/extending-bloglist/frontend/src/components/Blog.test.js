import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

const blog = {
  author: 'random author',
  title: 'random title',
  url: 'http://randomurl.com',
  likes: 42,
  user: {
    username: 'random username',
    name: 'random name',
    id: '4444444444',
  },
}
const mockHandleLike = jest.fn()
const mockHandleRemoveBlog = jest.fn()

function renderComponent() {
  return render(
    <Blog
      blog={blog}
      handleLike={mockHandleLike}
      handleRemoveBlog={mockHandleRemoveBlog}
    />
  )
}

describe('Blog component', () => {
  it('should render only title and author by default', () => {
    const component = renderComponent()
    expect(component.container).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )
    for (const part of [
      blog.url,
      `likes : ${blog.likes}`,
      `posted here by ${blog.user.username}`,
    ]) {
      const element = component.getByText(part)
      expect(element).not.toBeVisible()
    }
  })

  it('should render url and likes after shown details button clicked', () => {
    const component = renderComponent()
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    for (const part of [
      `${blog.title} ${blog.author}`,
      blog.url,
      `likes : ${blog.likes}`,
      `posted here by ${blog.user.username}`,
    ]) {
      const element = component.getByText(part)
      expect(element).toBeVisible()
    }
  })

  it('should have like button handler call twice with 2 clicks', () => {
    const component = renderComponent()
    fireEvent.click(component.getByText('view'))

    fireEvent.click(component.getByText('like'))
    fireEvent.click(component.getByText('like'))
    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})
