import React, { Component } from 'react';
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js';
import CodeUtils from 'draft-js-code';
import initialEditorState from './editorState';
import styles from './styles.scss';

class CodeEditor extends Component {
  constructor(...args) {
    super(...args);
    this.state = { editorState: initialEditorState };
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.keyBindingFn = this.keyBindingFn.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleTab = this.handleTab.bind(this);
  }
  onChange(editorState) {
    this.setState({ editorState });
  }
  handleKeyCommand(command) {
    const { editorState } = this.state;
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
    const { editorState } = this.state;
    this.onChange(CodeUtils.handleReturn(e, editorState));
    return true;
  }
  handleTab(e) {
    const { editorState } = this.state;
    this.onChange(CodeUtils.handleTab(e, editorState));
  }
  render() {
    return (
      <div className={styles.editor}>
        <Editor
          editorState={this.state.editorState}
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

export default CodeEditor;

