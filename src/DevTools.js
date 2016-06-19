import React from 'react';
import { createDevTools } from 'redux-devtools';
import Dispatcher from 'redux-devtools-dispatch';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import MultipleMonitors from 'redux-devtools-multiple-monitors';
import FilterMonitor from 'redux-devtools-filter-actions';
import * as actionCreators from './actions';

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="h"
    changePositionKey="q"
    defaultIsVisible={false}
  >
    <MultipleMonitors>
      <FilterMonitor blacklist={['MOUSE_MOVE']} >
        <LogMonitor />
      </FilterMonitor>
      <Dispatcher actionCreators={actionCreators} />
    </MultipleMonitors>
  </DockMonitor>
);

export default DevTools;

