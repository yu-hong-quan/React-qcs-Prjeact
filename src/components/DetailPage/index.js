import React,{Component} from 'react';
import axios from 'axios';
import ShopingHeader from '../common/ShopingHeader';
import './DetailPage.scss';
import {Icon,Badge} from 'antd';

class DetailPage extends Component{
    constructor(props,context){
        super(props,context);
        this.userList = props.location.state.data;
        this.state={
            userList:props.location.state.data,
            TopImg:[],
            titleName:'',
            ShopingIMGInfoList:[
                {'id':0,'name':'开箱','type':true},
                {'id':1,'name':'体验','type':false},
                {'id':2,'name':'图片','type':false}
            ],
            ShopingInfoIMG:[],
            total:0,
            success:false,//添加成功弹框效果
        }
    }
    componentDidMount(){
        axios.get('https://h5.watsons.com.cn/tms/aladdin/get?code=h5_topfixed_img')
		.then((item)=>{
			// console.log(item)
			if(item){
                this.setState({
                    TopImg:item.data.data.datas[0].image_url,
                    titleName:this.userList.brand_name,
                })
            }
        })

        // 商品广告长图数据请求
        axios.get('https://h5.watsons.com.cn/item/desc/data/get?item_uid=11_'+this.state.userList.item_id)
        .then((item)=>{
            this.setState({
                ShopingInfoIMG:item.data,
            })
        })
        //初始时的 总数量
		this.totalFunc();
    }
    LiActive = (id) =>{
        let newArr = this.state.ShopingIMGInfoList;
        for(let i=0;i<newArr.length;i++){
            if(i === id){
                newArr[i].type=true;
            }else{
                newArr[i].type=false;
            }
        }
        this.setState({
            ShopingIMGInfoList:newArr,
        })
    }
    Pushhome = ()=>{
        this.props.history.push('/');
    }
    goShopingCath = ()=>{
        this.props.history.push('/ShopingCath');
    }

    // 添加购物车函数
    addCartFunc=()=>{
        // 需要将 商品名称、图片地址、价格、数量添加到缓存中
        let data = [];//添加新数据
        let flag = true;//添加或修改的标识位，true表示新增，false表示修改

        let timeout = '';
        this.setState({
            success:true,
        })

        // 将缓存中的数据拿出来转为数组
        let arr = JSON.parse(localStorage.getItem('ShopingCath'));
        console.log(arr);
        // 判断如果存在数据，则追加，否则新增
        if(arr !=null && arr.length){
            arr.map((item)=>{
                // 在判断 是否是同种商品
                if(item.id === this.state.userList.item_id){
                    item.num++;
                    flag = false;
                }
                data.push(item);
            })
        }
        // flage为false，新增数据
        if(flag){
            data.push({
                id:this.state.userList.item_id,
                img_src:this.state.userList.over_image_url,
                app_price:this.state.userList.max_app_price,
                market_price:this.state.userList.max_market_price,
                name:this.state.userList.item_long_name,
                num:1,
                CheckBoxtype:true,
            })
        }
        // 将数据保存到缓存
        //JSON.stringify 数组转字符串
        localStorage.setItem('ShopingCath',JSON.stringify(data));
        //初始时的 总数量
        this.totalFunc();
        
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            this.setState({
                success:false,
            })
        },1000)

    }
    // 计算购物车总商品数量
    totalFunc=()=>{
        let arr = JSON.parse(localStorage.getItem('ShopingCath'));
        let sum = 0;
        if(arr != null && arr.length){
            arr.map((item)=>{
                sum += Number(item.num);
            })
            this.setState({
                total:sum,
            })
        }
    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        }
    }
    render(){
        return(
            <div className='DetailPage'>
                <ShopingHeader TopImg={this.state.TopImg} titleName={this.state.userList.brand_name} history={this.props.history}/>
                <div className='WapperBTN'>
                    <div onClick={this.Pushhome}><Icon type="home" />首页</div>
                    <div onClick={this.goShopingCath}>
                        <Icon type="shopping-cart" />
                        <Badge count={this.state.total} showZero>
                            <a href="#" className="head-example" />
                        </Badge>
                    </div>
                </div>
                <div className='DetailPage-info'>
                    <div className='ShopingIMG'>
                        <img src={this.state.userList.over_image_url}/>
                    </div>
                    <div className='ShopingIMG-infoList'>
                        <ul>
                            {
                                this.state.ShopingIMGInfoList.map((item,index)=><li key={index} onClick={()=>this.LiActive(item.id)} className={item.type?'active':''}>
                                    {item.id <2 ? <span><Icon type="caret-right" /> {item.name}</span>:item.name}
                                </li>)
                            }
                        </ul>
                    </div>
                    <div className='ShopingInfo'>
                        <div className='ShopingTitle'>{this.state.userList.item_long_name}</div>
                        <div className='ShopingPrice'>
                            ￥<span className='max-app-price'>{this.state.userList.max_app_price/100}</span>
                            <span className='max-market-price'>{this.state.userList.max_market_price != 0 ?'￥'+this.state.userList.max_market_price/100:''}</span>
                        </div>
                    </div>
                </div>
                <div className='ShopingFoterCath'>
                    <div onClick={this.addCartFunc}>加入购物车</div>
                    <div>立即购买</div>
                </div>
                <div className='Baozheng'>
                    <div><Icon type="check-circle" />正品保证</div>
                    <div><Icon type="check-circle" />满￥68免邮</div>
                    <div><Icon type="check-circle" />7天退货</div>
                </div>
                <div className='add_success' style={this.state.success?{'display':'block'}:{'display':'none'}}>添加成功</div>
                <div className='ShopingInfoIMG'>
                    {
                        this.state.ShopingInfoIMG.map((item,index)=>{
                            return (
                               <img src={item} key={index}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default DetailPage