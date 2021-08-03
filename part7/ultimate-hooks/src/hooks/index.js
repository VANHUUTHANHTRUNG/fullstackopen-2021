import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => setValue('')

  return {
    type,
    value,
    onChange,
    onReset,
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    if (baseUrl === null) return
    ;(async () => {
      try {
        const response = await axios.get(baseUrl)
        setResources(response.data)
      } catch (error) {
        console.log(error)
        setResources([])
      }
    })()
  }, [baseUrl])

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)
      setResources([...resources, response.data])
    } catch (error) {
      console.log(error)
    }
  }

  const service = {
    create,
  }

  return [resources, service]
}
