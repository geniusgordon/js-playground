import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import styles from './styles.scss';

class Console extends Component {
  static propTypes = {
    logs: PropTypes.array,
  };
  componentWillUpdate() {
    const node = findDOMNode(this);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight < node.scrollHeight + 1;
  }
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      const node = findDOMNode(this);
      node.scrollTop = node.scrollHeight - node.offsetHeight;
    }
  }
  render() {
    const logList = this.props.logs.map((log, i) => {
      const logClass = cx(styles.log, {
        [styles.error]: log.type === 'error',
      });
      return (
        <div key={i} className={logClass}>
          <span className={styles.prompt}>> </span>
          <span className={styles.value}>{log.value}</span>
        </div>
      );
    });
    return (
      <div className={styles.console}>
        {logList}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  logs: state.compiler.logs,
});

export default connect(mapStateToProps)(Console);

