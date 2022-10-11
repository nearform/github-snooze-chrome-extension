import { useEffect, useState } from 'react'
import { writeToLocalStorage, readFromLocalStorage } from '../api/chrome'

export function useChromeLocalStorage(key, defaultValue) {
  const [data, setData] = useState(defaultValue)
  const [localData, setLocalData] = useState(defaultValue)

  useEffect(() => {
    if (data) {
      setLocalData(data)
    }
  }, [data])

  useEffect(() => {
    const readLocalStorage = async () => {
      try {
        const value = await readFromLocalStorage(key)
        if (JSON.stringify(value[key]) !== JSON.stringify(defaultValue)) {
          setData(value[key])
        }
      } catch (error) {
        console.error('readFromLocalStorage error:', error)
      }
    }
    readLocalStorage()
  }, [key, defaultValue])

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
