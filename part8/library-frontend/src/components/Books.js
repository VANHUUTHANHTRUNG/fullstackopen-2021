import { useLazyQuery } from '@apollo/client'

import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'
import Select from 'react-select'

const Books = ({ show, allBooks }) => {
  const [selectedGenres, setSelectedGenres] = useState([])
  const [fetchBook, { loading, error, data }] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: [...selectedGenres.map((s) => s.value)] },
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    fetchBook()
  }, [selectedGenres, fetchBook])

  if (loading) return <div>loading...</div>
  if (error) return <div>Error, {error.message}</div>

  if (!show) {
    return null
  }
  const genres = [
    ...new Set(
      allBooks.reduce(
        (accumulator, current) =>
          current?.genres ? [...accumulator, ...current.genres] : accumulator,
        []
      )
    ),
  ]
  const options = genres.map((genre) => {
    return {
      label: genre,
      value: genre,
    }
  })

  const books = data.allBooks

  return (
    <div>
      <h2>books</h2>
      <p>
        Filter(adding up) books from:{' '}
        {selectedGenres.length === 0
          ? 'genre not selected'
          : selectedGenres.map((s) => s.value).join(' ')}
      </p>
      {books.length ? (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No book to display</div>
      )}
      <Select
        options={options}
        isMulti
        name='genres'
        placeholder='Select genre filter'
        value={selectedGenres}
        onChange={setSelectedGenres}
      />
    </div>
  )
}

export default Books
