const React = require('react');
const ReactDom = require('react-dom');
import {hot} from 'react-hot-loader/root';

import RSP from './RSPHooks';

const Hot = hot(RSP);

ReactDom.render(<Hot />, document.querySelector('#root'))