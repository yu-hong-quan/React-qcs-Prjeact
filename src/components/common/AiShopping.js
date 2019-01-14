import React,{Component} from 'react';
import axios from 'axios';
import './AiShopping.scss';
import {Icon} from 'antd';

class AiShopping extends Component{
    constructor(){
        super();
        this.state={
            AiShoppingData:[]
        }
    }
    componentDidMount(){
        axios.get('act/mop/aladdin/recommend?source=EXCLUSION&count=50&offset=0&items=3657')
        .then((resp)=>{
            console.log(resp.data.data.item_list)
            this.setState({
                AiShoppingData:resp.data.data.item_list
            })
        })
    }
    render(){
        return(
            <div className='AiShopping'>
                <ul className='AiShopping-list'>
                    {
                        this.state.AiShoppingData.map((item,index)=>{
                            return (
                                <li key={item+index}>
                                    <div className='Img-wapper'>
                                        <img src={item.over_image_url} alt={item.item_name}/>
                                        <span className='ManJian'>
                                            <span>
                                                {item.promotions[0] != '' ?item.promotions[0]:''}
                                            </span>
                                            <span>
                                                {item.promotions[1] != '' ?item.promotions[1]:''}
                                            </span>
                                        </span>
                                    </div>                                
                                    <div className='Shopping-name'>{item.item_name.slice(0,16)}</div>
                                    <div className='Shopping-price'>
                                        <span>￥{item.max_app_price/100}</span>
                                        <span><Icon type="shopping-cart" /></span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default AiShopping;