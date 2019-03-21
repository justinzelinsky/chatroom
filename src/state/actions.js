export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const updateUsername = username => ({
  type: UPDATE_USERNAME,
  payload: {
    username
  }
});

export const SELECTED_USERNAME = 'SELECTED_USERNAME';
export const selectedUsername = () => ({
  type: SELECTED_USERNAME
});

export default {
  updateUsername,
  selectedUsername
};

