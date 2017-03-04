import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import {Router, Scene, Actions} from 'react-native-router-flux';
import {Provider, connect} from 'react-redux';
import configureStore from './store/configureStore';
import {persistStore} from 'redux-persist';

import Home from './components/Home';

const RouterWithRedux = connect()(Router);
const store = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rehydrated: false
    }
  }

  componentWillMount() {
    persistStore(store, {
      storage: AsyncStorage,
      blacklist: ['nav']
    }, () => {
      this.setState({rehydrated: true});
      console.log('finished restoration!!!');
    })
  }

  render() {
    if (!this.state.rehydrated) {
      return <View/>
    }
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key={'root'} initial={true} hideNavBar hideTabBar>
            <Scene key={'home'} component={Home}/>
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}