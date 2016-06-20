import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import styles from './styles.scss';

const Compiler = ({ execute }) => (
  <div className={styles.controlPanel}>
    <div className={styles.option} onClick={execute}>run</div>
  </div>
);

Compiler.propTypes = {
  execute: PropTypes.func,
};

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(Compiler);

