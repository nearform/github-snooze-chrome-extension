import { useChromeLocalStorage } from '../../src/hooks/useChromeLocalStorage'
import { renderHook } from '@testing-library/react'
import { writeToLocalStorage, readFromLocalStorage } from '../../src/api/chrome'
import { act } from 'react-dom/test-utils'

const NOT_IN_STORAGE = {
  key: 'KEY_WITHOUT_VALUE'
}
const IN_STORAGE = { key: 'KEY_WITH_VALUE', value: 'fromChromeLocalStorage' }

jest.mock('../../src/api/chrome', () => {
  let mockChromeLocalStorage = {
    KEY_WITH_VALUE: 'fromChromeLocalStorage'
  }
  return {
    readFromLocalStorage: jest.fn(key => {
      return { [key]: mockChromeLocalStorage[key] }
    }),
    writeToLocalStorage: jest.fn(item => {
      mockChromeLocalStorage = { ...mockChromeLocalStorage, ...item }
    }),
    readAllFromLocalStorage: () => mockChromeLocalStorage
  }
})

describe('useChromeLocalStorage.js', () => {
  test('should read value from local storage on mount', async () => {
    let result = null
    await act(async () => {
      ({ result } = renderHook(() => useChromeLocalStorage(IN_STORAGE.key)))
    })
    expect(readFromLocalStorage).toHaveBeenCalledWith(IN_STORAGE.key)
    expect(result.current.data).toEqual(IN_STORAGE.value)
    expect(result.current.localData).toEqual(IN_STORAGE.value)
  })

  test('should allow local data manipulation', async () => {
    let result = null
    await act(() => {
      ({ result } = renderHook(() =>
        useChromeLocalStorage(NOT_IN_STORAGE.key)
      ))
    })
    expect(result.current.localData).toBe(undefined)
    expect(result.current.data).toBe(undefined)
    expect(readFromLocalStorage).toHaveBeenCalledWith(NOT_IN_STORAGE.key)

    const newLocalData = 'newLocalData'

    await act(async () => {
      result.current.setLocalData(newLocalData)
    })
    expect(result.current.localData).toBe(newLocalData)
    expect(result.current.data).toBe(undefined)
    expect(writeToLocalStorage).not.toHaveBeenCalled()
  })

  test('should allow data manipulation', async () => {
    let result = null
    await act(() => {
      ({ result } = renderHook(() =>
        useChromeLocalStorage(NOT_IN_STORAGE.key)
      ))
    })
    const newData = 'newData'

    await act(async () => {
      result.current.setData(newData)
    })
    expect(result.current.localData).toBe(result.current.data)
    expect(writeToLocalStorage).toHaveBeenCalledWith({
      [NOT_IN_STORAGE.key]: newData
    })
  })
})
