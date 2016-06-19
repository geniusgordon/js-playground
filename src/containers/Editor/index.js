import React, { Component, PropTypes } from 'react';
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js';
import CodeUtils from 'draft-js-code';
import { connect } from 'react-redux';
import { edit } from './actions';
import styles from './styles.scss';

class CodeEditor extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  constructor(...args) {
    super(...args);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.keyBindingFn = this.keyBindingFn.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleTab = this.handleTab.bind(this);
  }
  handleKeyCommand(command) {
    const { editorState, onChange } = this.props;
    const newState = CodeUtils.handleKeyCommand(editorState, command)
      || RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  }
  keyBindingFn(e) {
    const command = CodeUtils.getKeyBinding(e)
      || getDefaultKeyBinding(e);
    return command;
  }
  handleReturn(e) {
    const { editorState, onChange } = this.props;
    onChange(CodeUtils.handleReturn(e, editorState));
    return true;
  }
  handleTab(e) {
    const { editorState, onChange } = this.props;
    onChange(CodeUtils.handleTab(e, editorState));
  }
  render() {
    return (
      <div className={styles.editor} style={{ color: '#525252' }}>
        <Editor
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          keyBindingFn={this.keyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          handleReturn={this.handleReturn}
          onTab={this.handleTab}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ editorState: state.editor });
const mapDispatchToProps = (dispatch) => ({
  onChange(editorState) {
    dispatch(edit(editorState));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);

