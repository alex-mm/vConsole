/**
 * LegaoTab Tab
 *
 * @author alex.mm
 */

import * as tool from '../lib/tool.js';
import VConsoleLogTab from './default.js';
import tplTabbox from './tabbox_legao.html';
import { parseQuery, stringifyQuery } from './util.js';

const operationData = [
  {
    name: 'Render',
    onClick() {
      if (window.LeGao) {
        LeGao.getContext().reRender();
      }
    },
    className: '',
  }, {
    name: parseQuery().__render_log ? 'Close render log' : 'Start render log',
    onClick() {
      const query = parseQuery();
      if (query.__render_log) {
        delete query.__render_log;
      } else {
        query.__render_log = true;
      }
      const queryString = stringifyQuery(query);
      const l = location;
      l.href = `${l.protocol}//${l.hostname}${l.port ? `:${l.port}` : ''}${l.pathname}?${queryString}${l.hash}`;
    },
    className: '',
  }, {
    name: parseQuery().__render_try ? 'Close render try' : 'Start render try',
    onClick() {
      const query = parseQuery();
      if (query.__render_try) {
        delete query.__render_try;
      } else {
        query.__render_try = true;
      }
      const queryString = stringifyQuery(query);
      const l = location;
      l.href = `${l.protocol}//${l.hostname}${l.port ? `:${l.port}` : ''}${l.pathname}?${queryString}${l.hash}`;
    },
    className: '',
  },
];

class LegaoTab extends VConsoleLogTab {

  constructor(...args) {
    super(...args);
    this.tplTabbox = tplTabbox;
  }

  onAddLegaoBar(callback) {
    let btnList = [];
    operationData.forEach((data) => {
      btnList.push({
        name: data.name,
        data: {
          type: data.name.toLowerCase()
        },
        className: data.calssName,
        onClick: data.onClick
      });
    });
    callback(btnList);
  }
} // END class

export default LegaoTab;
