import produce from 'immer';

import types from '../auth/types';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }

      case types.SIGN_OUT: {
        draft.profile = null;
        break;
      }

      default:
    }
  });
}
