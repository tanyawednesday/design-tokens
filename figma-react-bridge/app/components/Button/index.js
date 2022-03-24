/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import globalStyleConfig from '../../../../tokens.json';

const mapper = {
  sizing: { type: 'number', values: ['height', 'width'], unit: 'px' },
  spacing: { type: 'number', values: ['padding'], unit: 'px' },
  borderWidth: {
    unit: 'px'
  },
  borderRadius: {
    unit: 'px'
  }
};
export function Button({ children }) {
  const styles = {};
  Object.keys(globalStyleConfig.global).map((key) => {
    const map = mapper[globalStyleConfig.global[key].type];
    if (map?.values) {
      const constraint = map.values.find((v) => v.toUpperCase() === key.toUpperCase());
      if (constraint) {
        if (map.type === 'number') {
          styles[key.toLowerCase()] = parseInt(globalStyleConfig.global[key].value, 10) + map.unit;
        } else {
          styles[type.toLowerCase()] = globalStyleConfig.global[key].value;
        }
      }
    } else {
      let value = globalStyleConfig.global[key].value;
      let isNum = false;
      try {
        const num = parseInt(value, 10);
        if (Number.isInteger(num)) {
          isNum = true;
        }
      } catch (err) {}
      if (isNum) {
        console.log(Number.isNaN(value));
        console.log({ value, a: globalStyleConfig.global[key] });
        value = `${value}` + mapper[globalStyleConfig.global[key].type].unit;
      }
      styles[globalStyleConfig.global[key].type.toLowerCase()] = value;
      styles[kebabCase(globalStyleConfig.global[key].type)] = value;
      styles[globalStyleConfig.global[key].type] = value;
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
