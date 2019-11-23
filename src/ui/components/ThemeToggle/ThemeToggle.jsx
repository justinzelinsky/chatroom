import './style.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actions from 'state/actions';

const ThemeToggle = () => {
  const darkMode = useSelector(state => state.darkMode);
  const dispatch = useDispatch();
  const setDarkMode = isDarkMode => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    dispatch(actions.setDarkMode(isDarkMode));
  };

  return (
    <div styleName="dark-mode-toggle">
      <button onClick={() => setDarkMode(false)} type="button">
        ☀
      </button>
      <span styleName="toggle-control">
        <input
          checked={darkMode}
          id="dmcheck"
          onChange={() => setDarkMode(!darkMode)}
          styleName="dmcheck"
          type="checkbox"
        />
        <label htmlFor="dmcheck" />
      </span>
      <button onClick={() => setDarkMode(true)} type="button">
        ☾
      </button>
    </div>
  );
};

export default ThemeToggle;
