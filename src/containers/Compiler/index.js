import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdStop from 'react-icons/lib/md/stop';
import MdClear from 'react-icons/lib/md/clear';
import MdDesktopWindows from 'react-icons/lib/md/desktop-windows';
import { execute, terminate, clearLog } from './actions';
import { toggleWindow } from '../App/actions';
import styles from './styles.scss';
import parseKey from 'parse-key';
import { matchesKey } from '../Editor/utils';

class Compiler extends Component {
  static propTypes = {
    executeKey: PropTypes.string.isRequired,
    clearKey: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    dispatch: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleWindow = this.handleWindow.bind(this);
    this.handleExecute = this.handleExecute.bind(this);
    this.handleTerminate = this.handleTerminate.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.renderWindowIcon = this.renderWindowIcon.bind(this);
    this.renderExecuteIcon = this.renderExecuteIcon.bind(this);
    this.renderTerminateIcon = this.renderTerminateIcon.bind(this);
    this.renderClearIcon = this.renderClearIcon.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
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
    if (matchesKey(executeKey, e)) {
      e.preventDefault();
      this.handleExecute();
      return;
    }
    if (matchesKey(clearKey, e)) {
      e.preventDefault();
      this.handleClear();
      return;
    }
  }
  handleWindow() {
    this.props.dispatch(toggleWindow());
  }
  handleExecute() {
    this.props.dispatch(execute());
  }
  handleTerminate() {
    this.props.dispatch(terminate());
  }
  handleClear() {
    this.props.dispatch(clearLog());
  }
  renderWindowIcon() {
    const tooltip = this.props.visible ? 'close window' : 'open window';
    return (
      <div
        className={styles.option}
        onClick={this.handleWindow}
        data-tooltip={tooltip}
      >
        <MdDesktopWindows />
      </div>
    );
  }
  renderExecuteIcon() {
    return (
      <div
        className={styles.option}
        onClick={this.handleExecute}
        data-tooltip="run"
      >
        <MdPlayArrow />
      </div>
    );
  }
  renderTerminateIcon() {
    return (
      <div
        className={styles.option}
        onClick={this.handleTerminate}
        data-tooltip="stop"
      >
        <MdStop />
      </div>
    );
  }
  renderClearIcon() {
    return (
      <div
        className={styles.option}
        onClick={this.handleClear}
        data-tooltip="clear"
      >
        <MdClear />
      </div>
    );
  }
  render() {
    return (
      <div className={styles.controlPanel}>
        <div className={styles.left}>
          {this.renderWindowIcon()}
          <div className={styles.title}>JS 模擬器</div>
        </div>
        <div className={styles.right}>
          {this.renderExecuteIcon()}
          {this.renderTerminateIcon()}
          {this.renderClearIcon()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  visible: state.app.visible,
});

export default connect(mapStateToProps)(Compiler);

