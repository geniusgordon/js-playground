import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { execute, clearLog } from './actions';
import styles from './styles.scss';
import parseKey from 'parse-key';

class Compiler extends Component {
  static propTypes = {
    executeKey: PropTypes.string.isRequired,
    clearKey: PropTypes.string.isRequired,
    dispatch: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleExecute = this.handleExecute.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  matchesKey(key, event) {
    if (!key) {
      return false;
    }
    const charCode = event.keyCode || event.which;
    const ch = String.fromCharCode(charCode);
    return key.name.toUpperCase() === ch.toUpperCase() &&
      key.alt === event.altKey &&
      key.ctrl === event.ctrlKey &&
      key.meta === event.metaKey &&
      key.shift === event.shiftKey;
  }
  handleKeyDown(e) {
    if ((
      !e.ctrlKey && !e.metaKey && !e.altKey
    ) && (
      e.target.tagName === 'INPUT' ||
      e.target.tagName === 'SELECT' ||
      e.target.tagName === 'TEXTAREA' ||
      e.target.isContentEditable
    )) {
      return;
    }
    const executeKey = parseKey(this.props.executeKey);
    const clearKey = parseKey(this.props.clearKey);
    if (this.matchesKey(executeKey, e)) {
      e.preventDefault();
      this.handleExecute();
      return;
    }
    if (this.matchesKey(clearKey, e)) {
      e.preventDefault();
      this.handleClear();
      return;
    }
  }
  handleExecute() {
    this.props.dispatch(execute());
  }
  handleClear() {
    this.props.dispatch(clearLog());
  }
  render() {
    return (
      <div className={styles.controlPanel}>
        <div
          className={styles.option}
          onClick={this.handleExecute}
        >run</div>
        <div
          className={styles.option}
          onClick={this.handleClear}
        >clear</div>
      </div>
    );
  }
}

export default connect()(Compiler);

