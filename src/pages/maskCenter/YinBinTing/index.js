import React,{Component} from 'react';
import './YinBinTing.scss';


class YinBinTing extends Component{
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        return(
            <div className='YinBinTingWapper'>
                <div className='YinBinTing_BGtitle'><img src={this.props.bgImage} /></div>
                <div className='YinBinTing_DataWapper'>
                    <ul>
                       {
                            this.state.item_listData !== '' ? this.props.item_listData.map((item,index)=>(
                                <li key={index}>
                                    <div className='over-image-url'>
                                        <img src={item.over_image_url} />
                                        {
                                            item.specials !== '' ? <span>{item.specials}</span> :''
                                        }
                                    </div>
                                    <div className='item-info'>
                                        <span className='item-name'>{item.item_name.slice(0,12)}</span>
                                        <span>
                                            <span className='dazhejia'>￥{item.max_app_price/100}</span>
                                            <span className='yaunjia'>
                                                {item.max_market_price !== 0 ? '￥'+item.max_market_price/100:''}
                                            </span>
                                        </span>
                                    </div>
                                </li>
                            )):''
                       }
                    </ul>
                </div>
            </div>
        )
    }
}
export default YinBinTing;