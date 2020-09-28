import React, { FC, PropsWithChildren } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './rootReducer'

export const store = createStore(rootReducer)

export const ReduxWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
