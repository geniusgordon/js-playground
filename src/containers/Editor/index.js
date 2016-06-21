import React, { Component, PropTypes } from 'react';
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js';
import CodeUtils from 'draft-js-code';
import { connect } from 'react-redux';
import { edit } from './actions';
import styles from './styles.scss';

class CodeEditor extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.keyBindingFn = this.keyBindingFn.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.focus = () => this.refs.editor.focus();
  }
  onChange(editorState) {
    this.props.dispatch(edit(editorState));
  }
  handleKeyCommand(command) {
    const { editorState } = this.props;
    const newState = CodeUtils.handleKeyCommand(editorState, command)
      || RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
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
    const { editorState } = this.props;
    this.onChange(CodeUtils.handleReturn(e, editorState));
    return true;
  }
  handleTab(e) {
    const { editorState } = this.props;
    this.onChange(CodeUtils.handleTab(e, editorState));
  }
  render() {
    return (
      <div className={styles.editor} style={{ color: '#525252' }} onClick={this.focus}>
        <Editor
          ref="editor"
          editorState={this.props.editorState}
          onChange={this.onChange}
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

export default connect(mapStateToProps)(CodeEditor);

