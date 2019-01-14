import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
// 引入蚂蚁金服UI
import {Row,Col,Icon,Input} from 'antd';
import SearchElem from '../SearchElem';
import axios from 'axios';

import {withRouter} from 'react-router-dom';
// :''
// 引入样式表
import './header.scss'

class Header extends Component{
	constructor(){
		super();
		this.state={
			left:'100%',
			bln:false,
			tokenType:1,
		}
	}
	componentDidMount(){
		axios({
			method:'get',
			url:'http://192.168.2.251:7001/center',
			headers:{
				'Authorization':localStorage['token'],
			}
		}).then((res)=>{
			console.log(res);
			if(res.data.code === 0){//登录状态获取成功
				this.setState({
					tokenType:true
				})
			}else{
				//this.props.history.push('/login');
				this.setState({
					tokenType:false
				})
			}
			console.log(this.state.tokenType);
		})
		
	}
	Show = () =>{
		this.setState({
			bln:!this.state.bln
		})
	}
	goCenter=()=>{
		this.props.history.push('/Center');
	}
	goCath=()=>{
		if(this.state.tokenType){
			this.props.history.push('/ShopingCath');
		}else{
			this.props.history.push('/Loding');
		}
	}
	render(){
		const Search = Input.Search;
		const pathname = this.props.location.pathname;
		return(
			<div>
				{
					pathname === '/' || pathname === '/maskCenter' || pathname === '/foreTheGlobal' || pathname === '/familyLife' ?
						<div className="PositionFixed">
							<div className="qcs-search">
								<Row>
									<Col span={4}><Icon className="qcs-userImg" type="user" onClick={this.goCenter}/></Col>
									<Col span={16} onClick={this.Show}>
										<Search className="searchInput"
											placeholder="面膜"
											onSearch={value => console.log(value)}
										/>
									</Col>
									<Col span={4}><Icon className="qcs-shopping" type="shopping-cart" onClick={this.goCath} /></Col>
								</Row>
							</div>
							<nav className="qcs-menu">
								<ul>
									<li><NavLink to="/" exact activeClassName="active">今日推荐</NavLink></li>
									<li><NavLink to="/maskCenter" activeClassName="active">面膜中心</NavLink></li>
									<li><NavLink to="/familyLife" activeClassName="active">居家生活</NavLink></li>
									<li><NavLink to="/foreTheGlobal" activeClassName="active">购全球</NavLink></li>
								</ul>
							</nav>
							<SearchElem left={this.state.bln === true?this.state.left='0':this.state.left='100%'}/>
						</div>
					:''
				}
			</div>
		)
	}
}

export default withRouter(Header);