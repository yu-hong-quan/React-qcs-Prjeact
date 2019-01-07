import React,{Component} from 'react';
import axios from 'axios';
import YinBinTing from '../YinBinTing';

import './DieNenMask.scss';

class DieNenMask extends Component{
    constructor(){
        super();
        this.state={
            bgImage:['https://image.watsons.com.cn//upload/0de30e73.jpeg'],
            item_listData:[],
        }
    }
    componentDidMount(){
        axios.get('item/ws/group_list?current_page=1&page_size=20&group_id=8466&device_id=80061180-11cd-11e9-bc9a-836fbe43cbac')
		.then((resp)=>{
			console.log(resp.data.data.item_list)
			this.setState({
				item_listData:resp.data.data.item_list,
			})
		})
    }
    render(){
        console.log(this.state.item_listData)
        return(
            <div className='DieNenMask'>
                 <YinBinTing bgImage={this.state.bgImage} item_listData={this.state.item_listData}/>
            </div>
        )
    }
}
export default DieNenMask