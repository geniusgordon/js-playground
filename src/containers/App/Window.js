import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MdClose } from 'react-icons/lib/md';
import { throttle } from 'lodash/function';
import {
  mouseMove, mouseUp, dragWindowStart, resizeWindowStart, toggleWindow,
} from './actions';
import styles from './styles.scss';

class Window extends Component {
  static propTypes = {
    children: PropTypes.node,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
    onDragWindowStart: PropTypes.func.isRequired,
    onResizeWindowStart: PropTypes.func.isRequired,
    handleWindow: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
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
      left, top, width, height, visible,
      onDragWindowStart, onResizeWindowStart, handleWindow,
    } = this.props;
    const display = visible ? 'flex' : 'none';
    return (
      <div className={styles.window} style={{ left, top, width, height, display }}>
        <div
          className={styles.toolbar}
          onMouseDown={onDragWindowStart}
        >
          <div className={styles.close} onClick={handleWindow}>
            <MdClose />
          </div>
          <div className={styles.title}>JS 模擬器</div>
        </div>
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
  visible: state.app.visible,
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
  handleWindow() {
    dispatch(toggleWindow());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Window);

