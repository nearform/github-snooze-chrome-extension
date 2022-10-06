import React from 'react'
import { waitFor } from '@testing-library/react'
import { render } from '../renderer'
import NavBar from '../../src/components/NavBar'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' })
}))

jest.mock('../../src/api/chrome.js', () => {
  let chromeLocalStorage = {}
  return {
    readFromLocalStorage: key => ({ [key]: chromeLocalStorage[key] }),
    writeToLocalStorage: item => {
      chromeLocalStorage = { ...chromeLocalStorage, ...item }
    },
    readAllFromLocalStorage: () => chromeLocalStorage
  }
})

const DATA_TEST_ID_OPEN_SETINGS_DIALOG = 'open-settings-dialog'

describe('NavBar.js', () => {
  test('shows the proper NavBar for unauthenticated users', async () => {
    const { asFragment, getByTestId } = render(
      <NavBar isAuthenticated={false} />
    )

    await waitFor(() => {
      getByTestId(DATA_TEST_ID_OPEN_SETINGS_DIALOG)
    })

    expect(asFragment()).toMatchSnapshot()
  })

  test('shows the proper NavBar for authenticated users', async () => {
    const { asFragment, getByTestId } = render(
      <NavBar isAuthenticated={true} user={{ login: 'john' }} />
    )

    await waitFor(() => {
      getByTestId(DATA_TEST_ID_OPEN_SETINGS_DIALOG)
    })

    expect(asFragment()).toMatchSnapshot()
  })
})
