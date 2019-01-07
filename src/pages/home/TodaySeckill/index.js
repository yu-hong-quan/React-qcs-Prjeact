import React,{Component} from 'react';
import axios from 'axios'

import './TodaySeckill.scss';

class TodaySeckill extends Component{
	constructor(){
		super();
		this.state = {
			TodatSeckillStateTime:0,
			endTime:0,
			S:0,
			M:0,
			H:0,
		}
	}
	componentDidMount(){
		axios.get('activity/specials/info?count=8&code=Home_flashSale__Top_Img&device_id=731fd0a0-0cf0-11e9-bc16-bd277457be79')
		.then((resp)=>{
			if(resp){
				let now = resp.data.data.now;
				let endTime = resp.data.data.specials_info_d_t_o.end_time;
				this.TimeDate(now,endTime)
			}
		})
	}
	TimeDate = (now,endTime) =>{
		let differ = Math.floor((endTime-now)/1000)
			setInterval(()=>{
				let cha = differ-=1;
				let s = Math.floor(cha%60);
				let h = Math.floor(cha/60%60);
				let m = Math.floor(cha/60/60%24);
				this.setState({
					S:s,
					H:h,
					M:m
				})
			},1000)
		
	}
	componentWillUnmount(){
		this.setState((state,callback)=>{
			return;
		})
	}
	render(){
		// 设置style属性
		var sectionStyle = {
			backgroundImage:`url(${this.props.TodatSeckillBG})`
		}
		if(this.props.TodatSeckillData){
			return(
				<div className="TodaySeckillWarper" style={sectionStyle} >
					<div className="TodaySeckill-Title">
						<span>
							今日秒杀
							<span className="TimeSpan">
								<span>{this.state.M <10 ? '0'+this.state.M:this.state.M}</span>&nbsp;:
								<span>{this.state.H <10 ? '0'+this.state.H:this.state.H}</span>&nbsp;:
								<span>{this.state.S <10 ? '0'+this.state.S:this.state.S}</span>
							</span>
						</span>
						<span>更多好货></span>
					</div>
					<div className="TodaySeckill-Content">
						<ul>
							{
								this.props.TodatSeckillData.map((item)=><li key={item.item_id}>
									<div className="IMGdiv">
										<img src={item.image_url} alt={item.image_url}/>
										<span>必抢</span>
									</div>
									<span className="spanName">{item.item_short_name}</span>
									<span>
										<span>￥{item.promotion_price/100}</span>
										<span>￥{item.market_price !== ''? item.market_price/100:''}</span>
									</span>
								</li>)
							}
						</ul>
					</div>
				</div>
			)
		}else{
			return <h1>数据异常</h1>
		}
	}
}
export default TodaySeckill;