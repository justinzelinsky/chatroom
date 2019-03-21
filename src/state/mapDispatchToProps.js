import { bindActionCreators } from 'redux';
import actions from 'state/actions';

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default mapDispatchToProps;