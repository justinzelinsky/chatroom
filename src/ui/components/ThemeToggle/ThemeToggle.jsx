import './style.scss';

import React from 'react';
import { connect } from 'react-redux';
import { object, bool } from 'prop-types';

import mapDispatchToProps from 'state/mapDispatchToProps';

const ThemeToggle = ({ actions, darkMode }) => {
  const setDarkMode = isDarkMode => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    actions.setDarkMode(isDarkMode);
  };

  return (
    <div styleName="dark-mode-toggle">
      <button type="button" onClick={() => setDarkMode(false)}>
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
      <button type="button" onClick={() => setDarkMode(true)}>
        ☾
      </button>
    </div>
  );
};

ThemeToggle.propTypes = {
  actions: object.isRequired,
  darkMode: bool.isRequired
};

const mapStateToProps = state => ({
  darkMode: state.darkMode
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggle);
