import {createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'

const persistedReducer = persistReducer({
  key: 'root',
  storage
}, reducers)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export default store