const React = require('react');
const ReactDom = require('react-dom');
import {hot} from 'react-hot-loader/root';

import MineSearch from './MineSearch';

const Hot = hot(MineSearch);

ReactDom.render(<Hot />, document.querySelector('#root'));