import React,{Component} from 'react';
import {Input,Icon} from 'antd';

import '../common/header.scss'
import './Search.scss'
import {Link} from 'react-router-dom'

class Search extends Component{
	constructor(){
		super();
		this.state = {
			SearchHistoryData:[],
			left:''
		}
	}
	componentDidMount(){
		this.setState({
			SearchHistoryData:['会员卡','袋鼠','喷雾','沐浴','面膜'],
		})
	}
	Show = ()=>{
// 		this.setState({
// 			left:this.props.left == true?this.state.left='0':this.state.left='100%'
// 		})
	}
	render(){
		return(
			<div className="SearchWapper" style={{'left':this.props.left}}>
				<div className='SearchInputWapper'>
					<span className='searchSpan'><Icon type="search" /><Input placeholder="面膜" /></span>
					<Link to='/Loding'><span className="clons" onClick={this.Show}>取消</span></Link>
				</div>
				<div className='SearchHistoryWapper'>
					<div className='SearchHistoryTitle'>
						<span>搜索历史</span>
						<span><Icon type="delete" /></span>
					</div>
					<div className='SearchHistoryData'>
						<ul>
							{
								this.state.SearchHistoryData !== ''?this.state.SearchHistoryData.map((item,index)=><li key={item+index}>
									{item}
								</li>):''
							}
						</ul>
					</div>
				</div>
				<div className='HotSearchWapper'>
					<div className='HotSearchSearchTitle'>
						<span>热门搜索</span>
					</div>
					<div className='SearchHistoryData'>
						<ul>
							<li style={{'backgroundColor':'#FFE5EC','color':'#FFA8BE'}}>面膜</li>
							<li>会员卡</li>
							<li>袋鼠</li>
							<li>喷雾</li>
							<li>爆款面膜</li>
							<li>洁面乳</li>
							<li>沐浴</li>
							<li>防嗮</li>
							<li>一叶子</li>
							<li>美宝莲</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
export default Search