import React from 'react'
import { Provider } from 'react-redux'

import Home from '@/containers/Home'
import withReduxStore from '@/redux/store/with-redux-store'

class MyApp extends React.Component {
  render() {
    const { reduxStore } = this.props

    return (
      <Provider store={reduxStore}>
        <Home />
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
