const React = require('react');
const ReactDom = require('react-dom');
import {hot} from 'react-hot-loader/root';

import TicTacToe from './TicTacToe';

const Hot = hot(TicTacToe);

ReactDom.render(<Hot />, document.querySelector('#root'));