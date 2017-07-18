import './layer.less';
import './layer.scss';
import tpl from './layer.html';
import tplejs from './layer.ejs'; // ejs模板返回的是function

function layer() {
  return {
    name: 'layer',
    tpl: tpl,
    tplejs: tplejs
  };
}

export default layer;
