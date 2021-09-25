const React = require('react');
const ReactDom = require('react-dom');
import {hot} from 'react-hot-loader/root';

import ResponseCheck from './ResponseCheckHook';

const Hot = hot(ResponseCheck);

ReactDom.render(<Hot />, document.querySelector('#root'))