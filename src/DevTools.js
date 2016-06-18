import React from 'react';
import { createDevTools } from 'redux-devtools';
import Dispatcher from 'redux-devtools-dispatch';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import MultipleMonitors from 'redux-devtools-multiple-monitors';
const actionCreators = {};

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="h"
    changePositionKey="q"
    defaultIsVisible={false}
  >
    <MultipleMonitors>
      <LogMonitor />
      <Dispatcher actionCreators={actionCreators} />
    </MultipleMonitors>
  </DockMonitor>
);

export default DevTools;

