import React,{Component} from 'react';
import Swiper from 'swiper/dist/js/swiper.js'
import './Banner.scss'

class Banner extends Component{
	componentDidMount(){
		new Swiper('.swiper-container', {
			autoplay: {   //滑动后继续播放（不写官方默认暂停）
				disableOnInteraction: false,
			},
			pagination : {
				el: '.swiper-pagination',
			},
			observer:true,
			observerParents:true,
		});
	}
	render(){
		return(
			<div className="BannerWapper">
				<div className="swiper-container">
					<div className="swiper-wrapper">
					  {
						  this.props.BannerData.map((item)=><div className="swiper-slide" key={item.id}>
							<img src={item.image_url} />
						  </div>)
					  }
					</div>
					<div className="swiper-button-prev">
						←
					</div>
					<div className="swiper-button-next">
						→
					</div>
					<div className='swiper-pagination'></div>
			  </div>
			</div>
		)
	}
}
export default Banner;