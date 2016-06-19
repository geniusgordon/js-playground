import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash/function';
import { mouseMove, mouseUp, dragWindowStart, resizeWindowStart } from './actions';
import styles from './styles.scss';

class Window extends Component {
  static propTypes = {
    children: PropTypes.node,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
    onDragWindowStart: PropTypes.func.isRequired,
    onResizeWindowStart: PropTypes.func.isRequired,
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
    const {
      left, top, width, height,
      onDragWindowStart, onResizeWindowStart,
    } = this.props;
    return (
      <div className={styles.window} style={{ left, top, width, height }}>
        <div
          className={styles.toolbar}
          onMouseDown={onDragWindowStart}
        />
        <div
          className={styles.resizeHandle}
          onMouseDown={onResizeWindowStart}
        />
        {this.props.children}
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  left: state.app.left,
  top: state.app.top,
  width: state.app.width,
  height: state.app.height,
});

const mapDispatchToProps = (dispatch) => ({
  onMouseMove(e) {
    throttle((x, y) => {
      dispatch(mouseMove(x, y));
    }, 300)(e.clientX, e.clientY);
  },
  onMouseUp() {
    dispatch(mouseUp());
  },
  onDragWindowStart(e) {
    dispatch(dragWindowStart(e.clientX, e.clientY));
  },
  onResizeWindowStart(e) {
    dispatch(resizeWindowStart(e.clientX, e.clientY));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Window);

