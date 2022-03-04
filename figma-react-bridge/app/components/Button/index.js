/**
 *
 * Button
 *
 */

import React from 'react';

import globalStyleConfig from '../../../../tokens.json';

export function Button({ children }) {
  const style = globalStyleConfig.global.Primary;
  return (
    <button data-testid="button" style={{ [style.type]: style['value'] }}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default Button;
