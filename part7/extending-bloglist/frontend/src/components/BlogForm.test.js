import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, act } from '@testing-library/react'

import BlogForm from './BlogForm'

const formToSubmit = {
  author: 'random author',
  title: 'random title',
  url: 'random url',
}
const mockHandleFormSubmit = jest.fn()

describe('BlogForm ', () => {
  it('should be able to access its inputs via IDs', async () => {
    const component = render(
      <BlogForm handleFormSubmit={mockHandleFormSubmit} />
    )
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    fireEvent.change(author, { target: { value: formToSubmit.author } })
    fireEvent.change(title, { target: { value: formToSubmit.title } })
    fireEvent.change(url, { target: { value: formToSubmit.url } })
    const form = component.container.querySelector('#blog-form')
    await act(async () => {
      fireEvent.submit(form)
    })
    expect(mockHandleFormSubmit.mock.calls).toHaveLength(1)
    expect(mockHandleFormSubmit.mock.calls[0][0]).toEqual(formToSubmit)
  })
})
