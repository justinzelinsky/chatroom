import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';

import actions from 'state/actions';

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...actions,
    push
  }, dispatch)
});

export default mapDispatchToProps;