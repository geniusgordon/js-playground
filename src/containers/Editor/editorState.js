import { EditorState, RichUtils } from 'draft-js';
import decorator from './decorator';

const emptyState = EditorState.createEmpty(decorator);
const editorState = RichUtils.toggleBlockType(emptyState, 'code-block');

export default editorState;

