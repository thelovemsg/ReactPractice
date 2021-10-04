const React = require('react');
const ReactDom = require('react-dom');
import {hot} from 'react-hot-loader/root';

import Lotto from './LottoHooks';

const Hot = hot(Lotto);

ReactDom.render(<Hot />, document.querySelector('#root'))