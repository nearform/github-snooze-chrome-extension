import { useEffect, useState } from 'react'
import { writeToLocalStorage, readFromLocalStorage } from '../api/chrome'

export function useChromeLocalStorage(key) {
  const [data, setData] = useState()
  const [localData, setLocalData] = useState(data)

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
      }
    }
    readLocalStorage()
  }, [key])

  const setNewData = async value => {
    try {
      await writeToLocalStorage({ [key]: value })
      setData(value)
    } catch (error) {
      console.error('writeToLocalStorage error:', error)
    }
  }

  return {
    data,
    setData: setNewData,
    localData,
    setLocalData
  }
}
