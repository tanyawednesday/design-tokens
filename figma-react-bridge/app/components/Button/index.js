/**
 *
 * Button
 *
 */

import React from 'react';
import stringMath from 'string-math';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import globalStyleConfig from '../../../../tokens.json';

const DEPENDENT_KEYS = ['spacing', 'lineHeights', 'borderRadius'];
const IGNORE_KEYS = ['letter-space-s', 'letter-space-m', 'letter-space-l'];
const mapper = {
  sizing: {
    type: 'number',
    values: ['min-height', 'min-width', 'height', 'width'],
    unit: 'px'
  },
  spacing: { type: 'number', values: ['padding'], unit: 'px' },
  fontFamilies: { type: 'font-family' },
  color: {
    type: 'background-color',
    useType: true,
    values: ['Primary', 'Neutral'],
    types: ['background-color', 'color']
  },
  borderWidth: {
    unit: 'px'
  },
  lineHeights: {
    useType: true,
    values: ['Line Height M'],
    types: ['line-height'],
    unit: 'px'
  },
  borderRadius: {
    type: 'number',
    values: ['border-radius'],
    unit: 'px'
  },
  typography: {
    type: 'typography',
    mapper: (v, styles) => {
      // console.log(v, 'no idea buddy');
      if (styles) {
        if (v.fontFamily) {
          styles.fontFamily = v.fontFamily;
        }

        if (v.fontSize) {
          styles.fontSize = v.fontSize + 'px';
        }
        if (v.fontWeight) {
          if (typeof v.fontWeight === 'string') {
            // there is some kind of transformation here
            const fw = v.fontWeight.toLowerCase();
            switch (fw) {
              case 'medium':
                styles.fontWeight = 'normal';
                break;
              default:
                styles.fontWeight = v.fontWeight.toLowerCase();
            }
          } else {
            styles.fontWeight = v.fontWeight.toLowerCase();
          }
        }

        if (v.letterSpacing) {
          styles.letterSpacing = v.letterSpacing + 'px';
        }

        if (v.lineHeight) {
          styles.lineHeight = v.lineHeight + 'px';
        }

        if (v.textDecoration) {
          styles.textDecoration = v.textDecoration;
        }
        if (v.textCase) {
          styles.textTransform = v.textCase;
        }
      }
      return styles;
    }
  },
  boxShadow: {
    type: 'box-shadow',
    mapper: (v) => {
      const x = v?.x;
      const y = v?.y;
      let type = v?.type;
      const blur = v?.blur;
      const spread = v?.spread;
      const color = v?.color;
      if (type === 'dropShadow') {
        type = '';
      }
      return [type, color, `${x}px`, `${y}px`, `${blur}px`, `${spread}px`].join(' ');
    }
  }
};

function handleMapping(config, key, styles) {
  const map = mapper[config[key].type];

  // console.log({ v: map?.values, map, key, type: config[key].type });
  // console.log({ type: config[key].type, map });
  if (map?.values) {
    const constraint = map.values.find((v) => v.toUpperCase() === key.toUpperCase());
    const constraintIndex = map.values.findIndex((v) => v.toUpperCase() === key.toUpperCase());
    // console.log({ constraint, constraintIndex });
    if (constraint) {
      if (map.type === 'number') {
        // console.log({ key });
        styles[key.toLowerCase()] = parseInt(config[key].value, 10) + map.unit;
      } else {
        if (map.useType) {
          styles[map.types[constraintIndex].toLowerCase()] = config[key].value;
        } else {
          styles[key.toLowerCase()] = config[key].value;
        }
      }
    }
  } else if (map?.mapper) {
    // this is for Button Shadow
    const mapperResponse = map.mapper(config[key].value, styles);
    if (typeof mapperResponse === 'string') {
      styles[map.type.toLowerCase()] = mapperResponse;
    } else if (typeof mapperResponse === 'object') {
      // console.log({ mapperResponse });
      styles = { ...styles, ...mapperResponse };
    } else {
      styles[map.type.toLowerCase()] = mapperResponse;
    }
  } else if (map) {
    if (map?.type) {
      // this is for heading
      // console.log({ map, v: config[key].value });
      styles[map?.type?.toLowerCase()] = config[key].value;
    }
  } else {
    let value = config[key].value;
    let isNum = false;
    try {
      const num = parseInt(value, 10);
      if (Number.isInteger(num)) {
        isNum = true;
      }
    } catch (err) {}
    if (isNum && mapper[config[key].type]) {
      // console.log(Number.isNaN(value));
      // console.log({ value, a: config[key] });
      value = `${value}` + mapper[config[key].type].unit;
    }
    styles[config[key].type.toLowerCase()] = value;
    styles[kebabCase(config[key].type)] = value;
    styles[config[key].type] = value;
  }
  return styles;
}
export function Button({ children }) {
  let styles = {};

  const global = {};

  Object.keys(globalStyleConfig.global).map((key) => {
    global[kebabCase(key)] = globalStyleConfig.global[key];
  });
  Object.keys(global).map((key) => {
    if (DEPENDENT_KEYS.includes(global[key].type)) {
      Object.keys(global).map((innerKey) => {
        const value = global[innerKey].value;
        if (typeof value === 'string') {
          const v = value.includes(`{${key}}`);
          if (v) {
            global[innerKey].value = stringMath(value.replace(`{${key}}`, global[key].value));
          }
        } else {
          // handle for nested values -> values that are an object and have the value in one of the keys
        }
      });
    }
    if (!IGNORE_KEYS.includes(key)) {
      styles = handleMapping(global, key, styles);
    }
    console.log({ key, styles });
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
