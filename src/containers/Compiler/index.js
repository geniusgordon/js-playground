import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import styles from './styles.scss';

function renderActionButton(running, execute, terminate) {
  if (running) {
    return <div className={styles.option} onClick={terminate}>stop</div>;
  }
  return <div className={styles.option} onClick={execute}>run</div>;
}

const Compiler = ({ running, execute, terminate }) => (
  <div className={styles.controlPanel}>
    {renderActionButton(running, execute, terminate)}
  </div>
);

Compiler.propTypes = {
  running: PropTypes.bool,
  execute: PropTypes.func,
  terminate: PropTypes.func,
};

const mapStateToProps = (state) => ({
  running: state.compiler.running,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(Compiler);

