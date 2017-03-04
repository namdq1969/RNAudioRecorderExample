import Home from './Home';
import {connect} from 'react-redux';
import * as actions from './actions';
import {getNav, getComponent} from '../../reducers/rootReducer';

const mapStateToProps = (state) => ({
  ...getNav(state),
  ...getComponent(state)
})

export default connect(mapStateToProps, actions)(Home);
