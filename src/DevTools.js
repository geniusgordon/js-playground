import React from 'react';
import { createDevTools } from 'redux-devtools';
import Dispatcher from 'redux-devtools-dispatch';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import MultipleMonitors from 'redux-devtools-multiple-monitors';
import FilterMonitor from 'redux-devtools-filter-actions';
import * as actionCreators from './actions';

const blacklist = [
  'MOUSE_MOVE',
  'MOUSE_UP',
  'EDIT',
];

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible={false}
  >
    <MultipleMonitors>
      <FilterMonitor blacklist={blacklist} >
        <LogMonitor />
      </FilterMonitor>
      <Dispatcher actionCreators={actionCreators} />
    </MultipleMonitors>
  </DockMonitor>
);

export default DevTools;

