import React, { FC, PropsWithChildren } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './rootReducer'
import thunk from 'redux-thunk'

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const ReduxWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
