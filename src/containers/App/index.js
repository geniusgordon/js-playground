import React from 'react';
import Window from './Window';
import Editor from '../Editor';
import Compiler from '../Compiler';

const App = () => (
  <div>
    <Window>
      <Editor />
    </Window>
    <Compiler executeKey="ctrl-j" />
  </div>
);

export default App;

