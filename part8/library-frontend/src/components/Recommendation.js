import { useQuery, useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommendation = ({ show, allBooks }) => {
  const { loading, error, data: dataMe } = useQuery(ME)
  const [
    fetchBooks,
    { loading: loadingBook, error: errorBook, data: dataBook },
  ] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: dataMe?.me?.favoriteGenre },
    skip: dataMe === null,
    fetchPolicy: 'no-cache',
  })
  useEffect(() => {
    fetchBooks()
  }, [allBooks, loading, fetchBooks])
  if (!show || loading) return null
  if (loadingBook) return <div>loading...</div>
  if (errorBook || error)
    return <div>Error, {errorBook?.message || error?.message}</div>

  const { username, favoriteGenre } = dataMe.me
  const books = dataBook.allBooks
  return (
    <div>
      <h2>Recommendation page</h2>
      <p>
        Hi {username}, here is {books.length} book(s) in favorite genre{' '}
        {favoriteGenre}
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
    </div>
  )
}

export default Recommendation
