import React from 'react';
import Window from './Window';
import Editor from '../Editor';
import Compiler from '../Compiler';
import Console from '../Compiler/Console';

const App = () => (
  <div>
    <Window>
      <Editor />
      <Console />
    </Window>
    <Compiler executeKey="ctrl-j" clearKey="ctrl-l" />
  </div>
);

export default App;

