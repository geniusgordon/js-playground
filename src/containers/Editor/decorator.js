import React, { PropTypes } from 'react';
import { CompositeDecorator } from 'draft-js';
import rules from './regex';

const color = {
  base: '#525252',
  keyword: '#e96900',
  literal: '#ae81ff',
  builtIn: '#42b983',
  comment: '#b3b3b3',
  string: '#42b983',
};

function getComponent(type) {
  const component = (props) => (
    <span {...props} style={{ color: color[type] }}>
      {props.children}
    </span>
  );
  component.propTypes = {
    children: PropTypes.node,
  };
  return component;
}

/* eslint-disable no-cond-assign */
const syntaxDecorator = new CompositeDecorator(
  rules.map((rule) => ({
    strategy(contentBlock, callback) {
      const text = contentBlock.getText();
      let matchArr;
      while ((matchArr = rule.regex.exec(text)) !== null) {
        const start = matchArr.index;
        callback(start, start + matchArr[0].length);
      }
    },
    component: getComponent(rule.type),
  }))
);

export default syntaxDecorator;

