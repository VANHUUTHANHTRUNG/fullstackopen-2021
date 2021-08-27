import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = ({ show, notify, setPage, refetchBooks, updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    awaitRefetchQueries: true,
    update: (_store, response) => {
      updateCacheWith(response.data.addBook)
    },
    onError: (error) => {
      console.log(error)
      notify(error.graphQLErrors)
    },
    onCompleted: () => {
      refetchBooks()
    },
  })

  if (!show) {
    return null
  }

  const resetInputs = () => {
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log('add book...')
    addBook({
      variables: {
        title: title,
        published: Number(published),
        author: author,
        genres: genres,
      },
      onError: (error) => {
        console.log('error addBook', error)
      },
    })
    resetInputs()
    await refetchBooks()
    setPage('recommendation')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
