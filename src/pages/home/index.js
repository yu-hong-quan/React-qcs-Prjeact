import React,{Component} from 'react';
import axios from 'axios';
import {Modal} from 'antd';
// 引入组件
import TopAdvertising from './Topadvertising';
import ForeNav from './ForeNav';
import Coupon from './Coupon';
import TodaySeckill from './TodaySeckill';
import HotStyle from './HotStyle';
import SalesList from './SalesList';
import Banner from './Banner';
import Recommend from './Recommend';
import SkinCare from './SkinCare';
import HotCake from './HotCake';
import ShowerGel from './ShowerGel';
import VacuumCup from './VacuumCup';
import MNYGoodies from './MNYGoodies';
import Choiceness from './Choiceness';
import Nurse from './Nurse';
import './home.scss'

class Home extends Component{
	constructor(){
	    super();
	    this.state = {
			visible: true,
			MaskLayerData:[],
	        AdvertisingData:[],
			AdvertisingDataTwo:[],
			ForeNavData:[],
			CouponData:[],
			TodatSeckillBG:[],
			TodatSeckillTime:[],
			TodatSeckillData:[],
			HotStyleBG:[],
			HotStyleTwo:[],
			HotStyleThree:[],
			SalesListData:[],
			BannerData:[],
			RecommendOne:[],
			RecommendTwo:[],
			RecommendData:[],
			SkinCareOne:[],
			SkinCareData:[],
			HotCakeOne:[],
			HotCakeData:[],
			ShowerGelOne:[],
			ShowerGelData:[],
			VacuumCupOne:[],
			VacuumCupData:[],
			MNYGoodiesData:[],
			ChoicenessData:[],
			NurseData:[],
	    }
	};
	handleOk = (e) => {
		// console.log(e);
		this.setState({
			visible: false,
		});
	}

	handleCancel = (e) => {
		// console.log(e);
		this.setState({
			visible: false,
		});
	}
	componentWillUnmount(){
		this.setState = (state,callback)=>{
			return;
		}
	}
	componentDidMount(){
		// 弹框遮罩层
		axios.get('tms/aladdin/get?code=start_alert_image')
		.then((resp)=>{
			this.setState({
				MaskLayerData:resp.data.data.datas
			})
		});
		
	    // 首页大图广告数据请求
		axios.get('topic/data/T20181229095710968?device_id=d283b7a0-0c2d-11e9-baa5-3dc7ff602a3d')
		.then((resp)=>{
			let data = resp.data.data.layout[0].content.gifImage;
			let dataTwo = resp.data.data.layout[1].content.bg.image;
			this.setState({
				AdvertisingData:data,
				AdvertisingDataTwo:dataTwo
			})
		});
		// 首页四格导航和优惠券数据请求
		axios.get('aladdin/get_batch_data?codes=[%22new_header%22,%22new_Home_4navs_180105_1%22,%22new_Home_coupon_180105_4%22,%22Home_pingo_170505_5%22,%22Home_AboveTopic_activity_170505_7%22,%22Home_TopicCase_170505_7%22,%22Home_CategaryNavs_170505_7%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=e4e09030-0c50-11e9-8ac3-992cafd5f55a')
		.then((resp)=>{
			let data = resp.data.data.new_Home_4navs_180105_1.datas;
			let CouponDataTwo = resp.data.data.new_Home_coupon_180105_4.datas;
			this.setState({
				ForeNavData:data,
				CouponData:CouponDataTwo,
			})
		});
		
		// 今日秒杀
		axios.get('topic/data/T20181229094234589?device_id=48afacf0-0cb4-11e9-b8fa-c3749bfebbfc')
		.then((resp)=>{
			this.setState({
				TodatSeckillBG:resp.data.data.layout[0].content.bg,
			})
		});
		axios.get('activity/specials/info?count=8&code=Home_flashSale__Top_Img&device_id=731fd0a0-0cf0-11e9-bc16-bd277457be79')
		.then((resp)=>{
			this.setState({
				TodatSeckillTime:resp.data.data.specials_info_d_t_o,
				TodatSeckillData:resp.data.data.specials_item_v_o_s,
			})
		});
		
		// 爆款
		axios.get('topic/data/T20181229094234589?device_id=731fd0a0-0cf0-11e9-bc16-bd277457be79')
		.then((resp)=>{
			this.setState({
				HotStyleBG:resp.data.data.layout[1].content.bg.image,
				HotStyleTwo:resp.data.data.layout[2].content.gifImage,
				HotStyleThree:resp.data.data.layout[3].content.bg.image,
			})
		});
		
		// 销售榜单
		axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12779&device_id=a4d82610-0d04-11e9-a288-070e681aac8e')
		.then((resp)=>{
			this.setState({
				SalesListData:resp.data.data.item_list,
			})
		})
		
		// 轮播图数据请求
		axios.get('/aladdin/get_batch_data?codes=[%22chajian%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=a4d82610-0d04-11e9-a288-070e681aac8e')
		.then((resp)=>{
			this.setState({
				BannerData:resp.data.data.chajian.datas,
			})
		})
		
		// 推荐商品数据请求
		axios.get('topic/data/T20181229094234589?device_id=1f675a60-0dcb-11e9-8e31-2905d346f517')
		.then((resp)=>{
			this.setState({
				RecommendOne:resp.data.data.layout[6].content,
				RecommendTwo:resp.data.data.layout[7].content,
				SkinCareOne:resp.data.data.layout[9].content,
				HotCakeOne:resp.data.data.layout[11].content,
				ShowerGelOne:resp.data.data.layout[13].content,
				VacuumCupOne:resp.data.data.layout[15].content,
				MNYGoodiesData:resp.data.data.layout[17].content.bg,
			})
		})
		axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12780&device_id=1f675a60-0dcb-11e9-8e31-2905d346f517')
		.then((resp)=>{
			this.setState({
				RecommendData:resp.data.data.item_list,
			})
		})
		
		// 护肤品
		axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12781&device_id=1f675a60-0dcb-11e9-8e31-2905d346f517')
		.then((resp)=>{
			this.setState({
				SkinCareData:resp.data.data.item_list,
			})
		})
		
		// 爆款
		axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12543&device_id=1f675a60-0dcb-11e9-8e31-2905d346f517')
		.then((resp)=>{
			this.setState({
				HotCakeData:resp.data.data.item_list,
			})
		})
		
		// 沐浴露
		axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12545&device_id=1f675a60-0dcb-11e9-8e31-2905d346f517')
		.then((resp)=>{
			this.setState({
				ShowerGelData:resp.data.data.item_list,
			})
		})
		
		// 保温杯
		axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12782&device_id=1f675a60-0dcb-11e9-8e31-2905d346f517')
		.then((resp)=>{
			this.setState({
				VacuumCupData:resp.data.data.item_list,
			})
		})
		
		// 精选
		axios.get('aladdin/get_batch_data?codes=[%22new_header%22,%22new_Home_4navs_180105_1%22,%22new_Home_coupon_180105_4%22,%22Home_pingo_170505_5%22,%22Home_AboveTopic_activity_170505_7%22,%22Home_TopicCase_170505_7%22,%22Home_CategaryNavs_170505_7%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=1f675a60-0dcb-11e9-8e31-2905d346f517')
		.then((resp)=>{
			this.setState({
				ChoicenessData:resp.data.data.Home_TopicCase_170505_7.datas,
			})
		})
		
		// 护理
		axios.get('aladdin/get_batch_data?codes=[%22new_header%22,%22new_Home_4navs_180105_1%22,%22new_Home_coupon_180105_4%22,%22Home_pingo_170505_5%22,%22Home_AboveTopic_activity_170505_7%22,%22Home_TopicCase_170505_7%22,%22Home_CategaryNavs_170505_7%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=aefd5a60-0e2c-11e9-b775-13af88be5c24')
		.then((resp)=>{
			this.setState({
				NurseData:resp.data.data.Home_CategaryNavs_170505_7.datas,
			})
		})
	};
	render(){
		// 设置style属性
		var sectionStyle = {
			backgroundImage:`url(${this.state.TodatSeckillBG})`,
		}
		return(
			<div className="ShouyeTop" style={sectionStyle}>
				<Modal
					  visible={this.state.visible}
					  onOk={this.handleOk}
					  onCancel={this.handleCancel}
					  footer={null}
					>
					<img src='https://image.watsons.com.cn//upload/6db00343.png'/>
				</Modal>
				<TopAdvertising AdvertisingData={this.state.AdvertisingData} AdvertisingDataTwo={this.state.AdvertisingDataTwo} />
				<ForeNav ForeNavData={this.state.ForeNavData} />
				<Coupon CouponData={this.state.CouponData} />
				<TodaySeckill TodatSeckillTime={this.state.TodatSeckillTime} TodatSeckillBG={this.state.TodatSeckillBG} TodatSeckillData={this.state.TodatSeckillData}/>
				<HotStyle HotStyleBG={this.state.HotStyleBG} HotStyleTwo={this.state.HotStyleTwo} HotStyleThree={this.state.HotStyleThree}/>
				<SalesList TodatSeckillBG={this.state.TodatSeckillBG} SalesListData={this.state.SalesListData}/>
				<Banner BannerData={this.state.BannerData} TodatSeckillBG={this.state.TodatSeckillBG}/>
				<Recommend RecommendOne={this.state.RecommendOne} RecommendTwo={this.state.RecommendTwo} RecommendData={this.state.RecommendData}/>
				<SkinCare SkinCareData={this.state.SkinCareData} SkinCareOne={this.state.SkinCareOne}/>
				<HotCake HotCakeData={this.state.HotCakeData} HotCakeOne={this.state.HotCakeOne}/>
				<ShowerGel ShowerGelOne={this.state.ShowerGelOne} ShowerGelData={this.state.ShowerGelData}/>
				<VacuumCup VacuumCupOne={this.state.VacuumCupOne} VacuumCupData={this.state.VacuumCupData}/>
				<MNYGoodies MNYGoodiesData={this.state.MNYGoodiesData} />
				<Choiceness ChoicenessData={this.state.ChoicenessData}/>
				<Nurse NurseData={this.state.NurseData}/>
			</div>
		)
	}
}

export default Home;