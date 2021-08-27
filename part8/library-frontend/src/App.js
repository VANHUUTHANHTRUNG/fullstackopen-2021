import React, { useEffect, useState } from 'react'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Recommendation from './components/Recommendation'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [refetchBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    refetchBooks()
  }, [refetchBooks])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
  })

  if (!token)
    return (
      <div>
        <Notify errorMessage={errorMessage}></Notify>
        <h2>Login page</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendation')}>
          recommendation
        </button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>log out</button>
      </div>
      <Authors show={page === 'authors'} notify={notify} />
      <Books show={page === 'books'} allBooks={result?.data?.allBooks} />
      <NewBook
        show={page === 'add'}
        notify={notify}
        setPage={setPage}
        refetchBooks={refetchBooks}
      />
      <Recommendation
        show={page === 'recommendation'}
        allBooks={result?.data?.allBooks}
      />
    </div>
  )
}

export default App
