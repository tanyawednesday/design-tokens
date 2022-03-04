/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import globalStyleConfig from '../../../../tokens.json';

const mapper = {
  sizing: { type: 'number', values: ['height', 'width'] }
};
export function Button({ children }) {
  const styles = {};
  Object.keys(globalStyleConfig.global).map((key) => {
    const map = mapper[globalStyleConfig.global[key].type];
    if (map) {
      map.values.forEach((type) => {
        if (map.type === 'number') {
          styles[type] = parseInt(globalStyleConfig.global[key].value, 10);
        } else {
          styles[type] = globalStyleConfig.global[key].value;
        }
      });
    } else {
      styles[globalStyleConfig.global[key].type.toLowerCase()] = globalStyleConfig.global[key].value;
    }
  });
  console.log({ styles });
  return (
    <button data-testid="button" style={styles}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default Button;
