import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {BackTop,Icon} from 'antd';
// 引入页面
import Home from '../pages/home';
import MaskCenter from '../pages/maskCenter';
import ForeTheGlobal from '../pages/foreTheGlobal';
import FamilyLife from '../pages/familyLife';
import Loding from '../components/Loding';
import MoisturizingMask from '../components/MoisturizingMask';
import Center from '../components/Center';
import DetailPage from '../components/DetailPage';
import ShopingCath from '../components/ShopingCath';

// 引入组件
import Header from '../components/common/header';

// 定义路由表
const App = ()=>(
	<BrowserRouter>
		<div>
			<div>
				<BackTop>
				  <div className="ant-back-top-inner"><Icon type="up" /></div>
				</BackTop>
			<Header />
				<Switch>
					<Route path='/' exact component={Home}/>
					<Route path='/maskCenter' exact component={MaskCenter}/>
					<Route path='/foreTheGlobal' exact component={ForeTheGlobal}/>
					<Route path='/familyLife' exact component={FamilyLife}/>
					<Route path='/Loding' exact component={Loding}/>
					<Route path='/Center' exact component={Center}/>
					<Route path='/MoisturizingMask' exact component={MoisturizingMask}/>
					<Route path='/DetailPage/:item_id' exact component={DetailPage} />
					<Route path='/ShopingCath' exact component={ShopingCath}/>
				</Switch>
			</div>
		</div>
	</BrowserRouter>
)

// 导出路由表
export default App;