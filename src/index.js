import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// 引入路由表
import App from './router';

// 引入css重置文件
import 'reset-css'

// 引入axios
import 'axios'

// 引入swiper插件样式表
import 'swiper/dist/css/swiper.min.css'

// 优化
import * as serviceWorker from './serviceWorker';

// 引入蚂蚁金服样式表
import 'antd/dist/antd.css'

// 配置px像素转rem
import 'react-flexible';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
