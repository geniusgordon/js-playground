import { EditorState, RichUtils } from 'draft-js';
import PrismDecorator from 'draft-js-prism';

const decorator = new PrismDecorator();
const emptyState = EditorState.createEmpty(decorator);
const editorState = RichUtils.toggleBlockType(emptyState, 'code-block');

export default editorState;

