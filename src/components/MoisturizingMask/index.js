import React,{Component} from 'react';
import axios from 'axios';
import {Icon,Spin} from 'antd';

import ShopingHeader from '../common/ShopingHeader'
import './Moisturizing.scss'

class MoisturizingMask extends Component{
	constructor(){
		super();
		this.state = {
			listArr:[],
			topArr:[
				{'id':0,'name':'洁面卸妆','group_id':12983,'type':true},
				{'id':1,'name':'水乳面霜','group_id':12984,'type':false},
				{'id':2,'name':'精华眼霜','group_id':12985,'type':false}
			],
			type:false,
			group_id:12983,
			page:1,//判断当前页
			end:false,//判断是否到底，false表示到底了
		}
	}
	componentDidMount(){
		//调用 列表数据
		this.getData(this.state.group_id);

		// 调用滚动函数
		this.Scroll();
	}
	Scroll(){
		// 滚动事件
		window.onscroll = ()=>{
			//获取滚动高度
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			//获取窗口的可视高度
			let windowHeight = document.documentElement.clientHeight;
			//当前页面的总高度
			let scrollHeight = document.body.scrollHeight;
			// 判断触底了 则加1
			// console.log(scrollTop,(scrollHeight*this.state.page)-scrollTop +':'+windowHeight);
			
			if(scrollTop-scrollHeight >= windowHeight){
				// 获取数据
				this.moreData(this.state.page);
					
				// 更新当前页
				this.setState({
					page:this.state.page+1
				})
			}
		}
	}
	// 获取数据方法
	moreData(i){
		if(!this.state.end){
			this.setState({
				type:true
			});
			axios.get('item/ws/group_list?current_page='+i+'&page_size=24&group_id='+this.state.group_id+'&device_id=20b178f0-0fc0-11e9-8e3d-1ff5ed74673e')
			.then(resp=>{
				// 判断是否是最后一页
				if(resp.data.data.item_list === undefined){
					this.setState({
						end:true
					})
				}else{
					let oldArr = this.state.listArr;
					let newArr = [];
					newArr = oldArr.concat(resp.data.data.item_list);
					setTimeout(()=>{
						this.setState({
							listArr:newArr,
							type:false
						})
					},500);
				}
			})
		}
	}
	test = (id,group_id) =>{
		let newArr = this.state.topArr;
		for(var i=0;i<newArr.length;i++){
			if(i === id){
				newArr[i].type=true;
			}else{
				newArr[i].type=false;
			}
		}
		this.setState({
			topArr:newArr,
			group_id:group_id,
			page:1,
			end:false
		})

		// 调用获取数据方法 且将group_id传入
		this.getData(group_id);
	}
	getData(group_id){
		axios.get('item/ws/group_list?current_page=1&page_size=24&group_id='+group_id+'&device_id=20b178f0-0fc0-11e9-8e3d-1ff5ed74673e').then(res=>{
			// console.log(res);
			this.setState({
				listArr:res.data.data.item_list
			})
		})
	}
	render(){
		return(
			<div style={{'zIndex':'6','width':'100%','height':'100%','position':'absolute','backgroundColor':'#fff'}}>
				<ShopingHeader history={this.props.history} />
				<div className='Nav'>
					{
						this.state.topArr.map((item,index)=><div key={item+index} onClick={()=>this.test(item.id,item.group_id)} className={item.type?"active":""}>{item.name}</div>)
					}
				</div>
				<ul className='ShopingData'>
				{
					this.state.listArr.map((item,index)=><li key={index}>
						<div className='ShopingIMG'>
							<img src={item.over_image_url} alt={item.item_short_name}/>
							<div className='ShopingManJian'>
								{
									item.promotions? item.promotions.map((itemTwo,index)=><span key={index}>{itemTwo}</span>):''
								}
							</div>
						</div>
						<div className='ShopingINFO'>
							<div className='PriceTitle'>{item.sale_point?item.sale_point:' '}</div>
							<span className='PriceName'>{item.item_name}</span>
							<div className='Shopingprice'>
								<span>￥{item.max_price/100}</span>
								<span className='PriceCath'><Icon type="shopping-cart" /></span>
							</div>
							<span><span className='miaosha'>{item.specials}</span></span>
						</div>
					</li>)
				}
				</ul>
				<div className="loading" style={this.state.type && !this.state.end?{'display':'block'}:{'display':'none'}}><Icon type="loading" style={{ fontSize: 24 }} spin />正在加载中...</div>
				{this.state.end?<div className='footer'>到底了哟~</div>:''}
			</div>
		)
	}
}
export default MoisturizingMask