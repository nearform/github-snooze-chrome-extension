import React from 'react'
import { render } from '../renderer'
import NavBar from '../../src/components/NavBar'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' })
}))

jest.mock('../../src/hooks/useChromeLocalStorage.js', () => ({
  useChromeLocalStorage: function () {
    return {
      data: 1,
      setData: jest.fn(),
      localData: 1,
      setLocalData: jest.fn()
    }
  }
}))

const DATA_TEST_ID_OPEN_SETINGS_DIALOG = 'open-settings-dialog'

describe('NavBar.js', () => {
  test('shows the proper NavBar for unauthenticated users', async () => {
    const { asFragment, findByTestId } = render(
      <NavBar isAuthenticated={false} />
    )

    await findByTestId(DATA_TEST_ID_OPEN_SETINGS_DIALOG)

    expect(asFragment()).toMatchSnapshot()
  })

  test('shows the proper NavBar for authenticated users', async () => {
    const { asFragment, findByTestId } = render(
      <NavBar isAuthenticated={true} user={{ login: 'john' }} />
    )

    await findByTestId(DATA_TEST_ID_OPEN_SETINGS_DIALOG)

    expect(asFragment()).toMatchSnapshot()
  })
})
