import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash/function';
import { dragWindow, dragWindowStart, dragWindowEnd } from './actions';
import styles from './styles.scss';

class Window extends Component {
  static propTypes = {
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
  };
  constructor(...args) {
    super(...args);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
  onMouseMove(e) {
    this.props.onMouseMove(e);
  }
  onMouseUp() {
    this.props.onMouseUp();
  }
  render() {
    const { left, top, onMouseDown } = this.props;
    return (
      <div className={styles.window} style={{ left, top }}>
        <div
          className={styles.toolbar}
          onMouseDown={onMouseDown}
        />
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  left: state.app.left,
  top: state.app.top,
});

const mapDispatchToProps = (dispatch) => ({
  onMouseDown(e) {
    dispatch(dragWindowStart(e.clientX, e.clientY));
  },
  onMouseMove(e) {
    throttle((x, y) => {
      dispatch(dragWindow(x, y));
    }, 100)(e.clientX, e.clientY);
  },
  onMouseUp() {
    dispatch(dragWindowEnd());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Window);

