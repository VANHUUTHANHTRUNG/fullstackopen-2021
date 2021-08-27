import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR_BORN } from '../queries'
import Select from 'react-select'
const Authors = ({ show, notify }) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)
  const [editAuthorBorn, result] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      notify(error.graphQLErrors[0])
    },
  })

  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    if (result.data && result.data.name) {
      notify('Name not found')
    }
  }, [result.data, notify])

  if (loading) return <div>loading...</div>
  if (error) return <div>Error</div>

  if (!show) {
    return null
  }

  const authors = data.allAuthors
  const options = authors.map((author) => {
    return { value: author.name, label: author.name }
  })
  const resetInputs = () => {
    setSelectedOption(null)
    setBorn('')
  }

  const submit = async (event) => {
    event.preventDefault()
    editAuthorBorn({
      variables: {
        name: selectedOption.value,
        born: Number(born),
      },
    })
    resetInputs()
  }

  return (
    <div>
      <h2>authors</h2>
      {authors.length ? (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No author to display</p>
      )}
      <h3>Set birthday</h3>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Authors
