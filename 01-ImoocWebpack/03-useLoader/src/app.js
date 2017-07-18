import './css/common.css';
import Layer from './components/layer/layer.js';

const App = () => {
  const NUM = 666;
  console.log('学习webpack...' + NUM);
  console.log(Layer);

  const domEl = document.getElementById('app');
  const layer = new Layer();
  domEl.innerHTML = layer.tpl +
    layer.tplejs({  // ejs模板返回的是function,里面传递参数
     name: 'microme',
     arr: ['apple', 'huawei', 'xiaomi'],
    });
}

new App();