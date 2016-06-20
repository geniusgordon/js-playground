import React from 'react';
import Window from './Window';
import Editor from '../Editor';
import Compiler from '../Compiler';

const App = () => (
  <Window>
    <Editor />
    <Compiler />
  </Window>
);

export default App;

