import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {InputNumber,Icon,Button,Checkbox} from 'antd';
import './ShopingCath.scss';
import AiShopping from '../common/AiShopping';

class ShopingCath extends Component{
    constructor(){
        super();
        this.state = {
            tokenType:1,
            ShopingType:false,//购物车为空
            shopingArr:[],
            BianjiText:'编辑',
            BianjiType:true,
            arr:JSON.parse(localStorage.getItem('ShopingCath')),
            qcsCheckBox:false,
            total:0,
            ZongJia:0
        }
    }
    componentDidMount(){
        // 每次进入购物车发起请求，做登录判断
        axios({
			method:'get',
			url:'http://192.168.2.251:7001/center',
			headers:{
				'Authorization':localStorage['token']
			}
		}).then((res)=>{
			// console.log(res);
			if(res.data.code === 0){//登录状态获取成功
				this.setState({
					tokenType:true
				})
			}else{
				//this.props.history.push('/login');
				this.setState({
					tokenType:false
				})
			}
			// console.log(this.state.tokenType);
        })
        
        this.totalFunc();
        this.ZongJiaFunc();
        this.ShopingCheckBoxFunc();
        // 判断购物车是否为空
        if(this.state.arr != null && this.state.arr.length){
            this.setState({
                ShopingType:true,
                shopingArr:this.state.arr,
            })
        }
    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        }
    }
        
    logout=()=>{
		this.props.history.go(-1);
    }
    goHome=()=>{
		this.props.history.push('/');
    }

    Bianji=()=>{
        this.setState({
            BianjiType:!this.state.BianjiType,
        })
    }

    onChange=(item,ev)=>{
        var e = ev || window.event;
        let newArrTwo = this.state.arr
        if(e.target.defaultValue >=1){
            item.num = e.target.defaultValue;
        }else{
            e.target.defaultValue = 1;
            // alert('购买商品数量不能少于一件哦~');
        }
        if(item.id === newArrTwo.id){
            newArrTwo.num = item.num;
        }
        this.setState({
            arr:newArrTwo
        })
        
        localStorage.setItem('ShopingCath',JSON.stringify(this.state.arr));
        this.totalFunc();
        this.ZongJiaFunc();
    }

    // 全选和屈臣氏国内仓全选
    onChangeChecked=()=>{
        let newArrFore = this.state.arr;
        // let qcsCheckType = !this.state.qcsCheckBox;
        
        

        this.setState({
            qcsCheckBox:!this.state.qcsCheckBox
        })
        for(let i in newArrFore){
           newArrFore[i].CheckBoxtype = !this.state.qcsCheckBox
        }
        this.ZongJiaFunc()
        localStorage.setItem('ShopingCath',JSON.stringify(newArrFore));
    }
    // 商品内部checkbox
    ShopingCheckBoxFunc=(item)=>{
        // 获取缓存的购物车字段
        let newArrFive = this.state.arr;
        // 点击当前商品的checkbox且取反
        if(item){
            item.CheckBoxtype=!item.CheckBoxtype
        }
        // 调用计算总价方法
        this.ZongJiaFunc()

        //遍历缓存的在购物车中的每一个商品
        for(let i in newArrFive){
            // 判断如果商品中有一个checkbox为false
            if(!newArrFive[i].CheckBoxtype){
                // 则将全选设置为false
                this.setState({
                    qcsCheckBox:false
                })
                // 且将被处理过的缓存重新存储到localstrong中
                localStorage.setItem('ShopingCath',JSON.stringify(newArrFive));
                // 停止程序
                return;
            // 否则将全选设置为true
            }else{
                this.setState({
                    qcsCheckBox:true
                })
            }
        }
        // 不管以上判断是true还是false 都将被处理过的缓存重新存储到localstrong中
        localStorage.setItem('ShopingCath',JSON.stringify(newArrFive));
        
    }

    //购物车商品删除
    removeShoping=(index)=>{
        // 获取已保存在localstiong缓存中的的ShopingCath缓存对象
        let newArr = this.state.arr;
        // 删除被点击删除的元素对应id的商品
        newArr.splice(index,1);
        // 将新数组替换为
        this.setState({
            arr:newArr
        })
        localStorage.setItem('ShopingCath',JSON.stringify(newArr));
        
        this.totalFunc();

        if(!this.state.arr.length){
            this.setState({
                BianjiType:true
            })
        }
        if(this.state.arr.length == ''){
            this.setState({
                ShopingType:false
            })
        }
    }

    // 计算商品总件数
    totalFunc=()=>{
        let newArrThree = this.state.arr;
        let sum = 0;
        if(newArrThree != null && newArrThree.length){
            newArrThree.map((item)=>{
                sum += Number(item.num);
            })
            this.setState({
                total:sum,
            })
        }
        this.ZongJiaFunc()
    }

    // 计算选中商品总价格
    ZongJiaFunc=()=>{
        // 获取localstoring中的ShopingCath字段
        let newArrSix = this.state.arr;
        let sum = 0;
        for(let i in newArrSix){
            if(newArrSix[i].CheckBoxtype){
                let jiage = newArrSix[i].app_price/100*newArrSix[i].num;
                sum += jiage; 
            }
        }
        this.setState({
            ZongJia:sum
        })
        
    }

    render(){
       if(this.state.tokenType){
        console.log(this.state.arr);
           
            return(
                <div className='ShopingCath'>
                    <div className='ShopingCath-Title'>
                        <div><Icon type="left"  onClick={this.logout} /></div>
                        <div>购物车</div>
                        <div style={this.state.ShopingType?{'display':'block'}:{'display':'none'}} onClick={this.Bianji}>{this.state.BianjiType?'编辑':'完成'}</div>
                    </div>
                    {
                        this.state.ShopingType?<div className='ShopingCath-ContentTwo'>
                            <div className='BaoZheng'>
                                <ul>
                                    <li><img src='https://image.watsons.com.cn//upload/27910d08.png' alt='正品保证'/>正品保证</li>
                                    <li><img src='https://image.watsons.com.cn//upload/278ce554.png' alt='屈臣氏品牌'/>屈臣氏品牌</li>
                                    <li><img src='https://image.watsons.com.cn//upload/2e8ebc1f.png' alt='7天退货'/>7天退货</li>
                                </ul>
                            </div>
                            <div className='YinShiZhenChe'>尊敬的屈臣氏用户：我们对《隐私政策》进行了更新。请仔细阅读《隐私政策》并确定了解我们对您个人信息的处理规则。阅读过程中，如您有任何疑问，可联系我们的客服咨询，如您不同意协议中的任何条款，您应立即停止继续使用屈臣氏提供的服务。【点击查阅】</div>
                            <div className='qcs-GuoNeiCang'>
                                <span onChange={this.onChangeChecked}><Checkbox  checked={this.state.qcsCheckBox}>屈臣氏国内仓</Checkbox></span>
                                <span className='Man'>(已满￥68免运费)</span>
                            </div>
                            <div className='ShopingListData'>
                                <ul>
                                    {
                                        this.state.shopingArr.map((item,index)=>{
                                            return(
                                                <li key={index}>
                                                    <div>
                                                        <Checkbox checked={item.CheckBoxtype} onChange={()=>this.ShopingCheckBoxFunc(item)}></Checkbox>
                                                    </div>
                                                    <div>
                                                        <img src={item.img_src} alt={item.item_name}/>
                                                    </div>
                                                     <div>
                                                        <span>{item.name}</span>
                                                        <span  style={this.state.BianjiType?{'display':'none'}:{'display':'block'}}>
                                                            <span onClick={()=>this.removeShoping(index)}><Icon type="delete" />删除</span>
                                                            <span><InputNumber min={1} max={9999} defaultValue={item.num} onChange={()=>this.onChange(item)}/></span>
                                                        </span>
                                                    </div>
                                                    <div>
                                                         <span>￥{item.app_price/100}</span>
                                                         <span>x{item.num}</span>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className='MaiDian'>
                                    <div className='Gouka'>
                                        <span>购卡当单享满150减20优惠，再享会员价、积分购物抵现等福利</span>
                                        <Button type="primary" >购买</Button>
                                    </div>
                                    <div className='Zhifu'>
                                        <div>
                                            <span  onChange={this.onChangeChecked}>
                                                <Checkbox checked={this.state.qcsCheckBox} ></Checkbox>
                                                <span>全选</span>
                                            </span>
                                            <span>合计: <span>￥</span><span>{this.state.ZongJia}</span></span>
                                        </div>
                                        <div>
                                            {this.state.BianjiType?<span>去结算(<span>{this.state.total}</span>)</span>:<span onClick={this.deleteCheckBox}>删除所选(<span>{this.state.total}</span>)</span>}
                                        </div>
                                    </div>
                            </div>
                            <div className='TuiJian'>
                                <div className='TuiJian-title'>智能推荐商品</div>
                                <AiShopping></AiShopping>
                            </div>
                        </div>:<div className='ShopingCath-Content'>
                            <div className='ShopingCath-nullShow'>
                                <Icon type="shopping-cart" />
                                <div>剁剁剁！装满购物车!</div>
                                <Button type="primary"  onClick={this.goHome}>去首页逛逛</Button>
                            </div>
                        </div>
                    }
                </div>
            )
       }else{
           return <Redirect to='/Loding'/>
       }
    }
}
export default ShopingCath;