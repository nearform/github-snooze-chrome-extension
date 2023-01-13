import React from 'react'
import { createRoot } from 'react-dom/client'
import { readFromLocalStorage } from './api/chrome'
import { createClient, Provider } from 'urql';
import {
    SK_PAT,
    SK_USER,
  } from './constants'

import App from './App'

const client = createClient({
    url: 'https://api.github.com/graphql',
    fetchOptions: async () => {
        const { pat } =  await readFromLocalStorage([SK_PAT, SK_USER])
        
        if (!pat) {
            throw Error('PAT not available.')
        }
        return {
            headers: { authorization: `Bearer ${pat}` },
        };
    },
});

const root = createRoot(document.getElementById('root'))

root.render(
    <Provider value={client}>
        <App />
    </Provider>,
)
