import React,{Component} from 'react';
import axios from 'axios'
import './PrivilegedMask.scss';
import {Progress} from 'antd';
import TodaySeckill from '../../home/TodaySeckill';
import SalesList from '../../home/SalesList';
import YinBinTing from '../YinBinTing';
import DieNenMask from '../DieNenMask';

class PrivilegedMask extends Component{
	constructor(){
		super();
		this.state={
			TodatSeckillTime:[],
			TodatSeckillData:'',
			endTime:0,
			S:0,
			M:0,
			H:0,
			SalesListData:[],
			bgImage:['https://image.watsons.com.cn//upload/210d907f.jpeg'],
			item_listData:[],
		}
	}
	componentDidMount(){
		axios.get('activity/specials/info?count=8&code=seckill_maskcenter_real&device_id=0e8d33b0-10e9-11e9-8e08-69b40e6fbb00')
		.then((resp)=>{
			this.setState({
				TodatSeckillData:resp.data.data.specials_item_v_o_s,
				TodatSeckillTime:resp.data.data.specials_info_d_t_o,
			})
		})
		axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=11091&device_id=8623ff70-1176-11e9-96c1-1dcbef1c7981')
		.then((resp)=>{
			this.setState({
				SalesListData:resp.data.data.item_list
			})
		})
		axios.get('item/ws/group_list?current_page=1&page_size=20&group_id=10058&device_id=8623ff70-1176-11e9-96c1-1dcbef1c7981')
        .then((resp)=>{
            console.log(resp.data.data.item_list)
            this.setState({
                item_listData:resp.data.data.item_list,
            })
		})
	}
	render(){
		let golaboBG = {
			backgroundImage:'url(https://image.watsons.com.cn//upload/58e6dec4.jpg) no-repeat center center fixed',
		}
		return(
			<div className='PrivilegedMask'>
				<div className='PrivilegedMaskTitle'>
					<div className='PrivilegedMaskTitle-info'>
						<span className='PrivilegedMaskTitle-info-title'>特权面膜抢购</span>
						<span className='PrivilegedMaskTitle-info-info'>每款最多限购<span>3</span>件</span>
					</div>
					<div className='PrivilegedMaskTitle-logo'>
						<img src='//asset.watsons.com.cn/act/static/images/mask-center/f32ab5c224e50c8935e6b23ec.png' />
					</div>
					
				</div>
				<div className='PrivilegedMask-flashSale-Wapper'>
					<ul>
						{
							this.props.PrivilegedMaskData.map((item,index)=><li key={item+index}>
								<div className='PrivilegedMask-flashSale-leftImg'>
									<img src={item.image_url} />
									<div className='flassSaleTitle'>
										<span>限量</span>
										<span>{item.stock_all}</span>
									</div>
								</div>
								<div className='PrivilegedMask-flashSale-rightInfo'>
									<div className='item-short-name'>
										<span>{item.item_short_name}</span>
									</div>
									<div>
										<div className='item-price'>
											<span>抢购价 ¥<span>{item.item_type}</span><span>¥{item.market_price/100}</span></span>
										</div>
										<Progress percent={Math.floor((item.stock_all-item.stock_left)/item.stock_all*100)} />
										<div className='item-sum'>
												<span>
													<span>{item.stock_all-item.stock_left}</span>/
													<span>{item.stock_all}</span>
												</span>
											<div className='goumaiBTN'>
												<span>抢购</span>
											</div>
										</div>
									</div>
								</div>
							</li>)
						}
					</ul>
				</div>
				<TodaySeckill TodatSeckillData={this.state.TodatSeckillData} TodatSeckillTime={this.state.TodatSeckillTime} S={this.state.S} H={this.state.H} M={this.state.M}/>
				<div className='Golobao'>
					<div style={golaboBG}>
						<img src='https://image.watsons.com.cn//upload/58e6dec4.jpg'/>
						<ul>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div>
				</div>
				<SalesList SalesListData={this.state.SalesListData} />
				<YinBinTing bgImage={this.state.bgImage} item_listData={this.state.item_listData}/>
				<DieNenMask/>
			</div>
		)
	}
}
export default PrivilegedMask;