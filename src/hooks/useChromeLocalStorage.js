import { useEffect, useState } from 'react'
import { writeToLocalStorage, readFromLocalStorage } from '../api/chrome'

export function useChromeLocalStorage(key, initialValue) {
  const [data, setData] = useState(initialValue)
  const [localData, setLocalData] = useState(data)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (data) {
      setLocalData(data)
    }
  }, [data])

  useEffect(() => {
    const readLocalStorage = async () => {
      try {
        const value = await readFromLocalStorage(key)
        setData(value[key])
      } catch (error) {
        console.error('readFromLocalStorage error:', error)
        setData(initialValue)
      }
    }
    readLocalStorage()
  }, [key, initialValue])

  const setNewData = async value => {
    try {
      await writeToLocalStorage({ [key]: value })
      setData(value)
    } catch (error) {
      console.error('writeToLocalStorage error:', error)
      setData(initialValue)
    }
  }

  return {
    data,
    setData: setNewData,
    localData,
    setLocalData,
    hasError,
    setHasError
  }
}
