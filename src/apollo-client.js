import {InMemoryCache} from 'apollo-cache-inmemory'
import {setContext} from 'apollo-link-context'
import {createHttpLink} from 'apollo-link-http'
import {ApolloClient} from 'apollo-client'
import store from './store'

const httpLink = createHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjmkknt307gu00169j2qwj8dt'
})

const authLink = setContext((_, {headers}) => {
  const {token} = store.getState().auth
  return {
    headers: {
      ...headers,
      authorization: token && `Bearer ${token}`,
    }
  }
})

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})