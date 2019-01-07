import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
// 引入蚂蚁金服UI
import {Input,Icon,Button,Checkbox} from 'antd';

import './Loding.scss'

class Loding extends Component{
	// 设置初始值
	constructor(){
		super();
		this.state = {
			phone:'',
			smsCode:'',
			des:'',
			SmsValue:'发送验证码',
			disabled:false,
			LodingDisabled:false,
			checkedInput:true,
			setInt:'',
		}
	}
	changePhoneFunc=(ev)=>{
		this.setState({
			phone:ev.target.value
		})
	}
	changeSmsCodeFunc=(ev)=>{
		this.setState({
			smsCode:ev.target.value
		})
	}
	sendSmsCode=()=>{
		let reg = /\S/;
		let re = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
		// 判断手机号码是否为空
		// 去除空格
		let phone = this.state.phone.trim();
		// 判断是否为空
		if(phone === '' || !reg.test(phone)){
			alert('手机号不能为空');
		}else if(!re.test(phone)){// 判断手机号码格式是否正确
			alert('手机号格式有误');
		}else{//都符合则发送验证码调接口
			axios(// 发送验证码，调用接口，修改验证码按钮的样式	
				{
					method:'get',
					url:'http://192.168.2.251:7001/sms/addSms?phone='+phone,
				}
			).then((resp)=>{
				console.log(resp);
				this.setState({
					des:resp.data.success,
					disabled:true
				})
				this.daojishi();
			})
		}
	}
	daojishi =()=>{
		let i = 5;
		this.setState({
			setInt:setInterval(()=>{
				i--;
				this.setState({
					SmsValue:'重发('+i+'s)',
				})
				if(i<=0){
					this.setState({
						SmsValue:'获取验证码',
						des:'',
						disabled:false,
					})
					clearInterval(this.state.setInt);
				}
			},1000)
		})
	}
	LodingFunc=()=>{
		console.log('111')
		let reg = /\S/;
		let re = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
		let reSms = /^\d{4}$/;
		// 判断手机号码是否为空
		// 去除空格
		let phone = this.state.phone.trim();
		// 去除验证码前后空格
		let sms = this.state.smsCode.trim();

		// 验证
		if(phone === '' || !reg.test(phone) || !re.test(phone)){
			alert('手机号码有误，请重新输入！！！');
		}else if(sms === '' || !reg.test(sms) || !reSms.test(sms)){
			alert('短信验证码有误请重新输入');
		}else{//格式正确，发送登录请求
			// 登录通常为post请求，创建URL对象 实现post请求
			var parms = new URLSearchParams();
			parms.append('phone',this.state.phone);
			parms.append('smsCode',this.state.smsCode);

			// 发起请求
			axios({
				method:'post',
				url:'http://192.168.2.251:7001/user/login',
				data:parms,//post传递参数给服务器
			}).then((resp)=>{
				// 保存token
				localStorage['token'] = resp.data.data.token;
				console.log('登录成功');
				// 登录成功后，跳转路由
				this.props.history.push('/Center');
			}).catch((err)=>{
				this.props.history.push('/Loding')
				var phoneInputValue = document.getElementsByClassName('phoneInputValue')[0];
				var smsCodeInputValue = document.getElementsByClassName('smsCodeInputValue')[0];
				smsCodeInputValue.value = '';
				phoneInputValue.value = '';
				this.setState({
					disabled:false,
					SmsValue:'发送验证码',
					des:'短信验证码有误，请重新登录/注册'
				});
				clearInterval(this.state.setInt);
			})
		}
	}
	componentWillUnmount(){
		this.setState = (state,callback)=>{
			return;
		}
	}
	onChangeChecked=(e)=>{
		console.log(`checked = ${e.target.checked}`);
		if(e.target.checked === false){
			this.setState({
				LodingDisabled:true,
			})
		}else{
			this.setState({
				LodingDisabled:false,
			})
		}
	}
	render(){
		return(
			<div>
				<div className='Lodingwaiper'>
					<div className='LodingTitle'>
						<span className="left-Icon"><Link to="/"><Icon type="left" /></Link></span>
						<span className="title">登录/注册</span>
						<span></span>
					</div>
					<div className='LodingFromWapper'>
						<span className="infoWapper"><Icon type="info-circle" /> 商城全新版本上线，手机登录更安全哦</span>
						<span><Input placeholder="输入手机号" name='phone' className='phoneInputValue' onInput={this.changePhoneFunc}/></span>
						<span className="InputYZMWapper">
							<Input placeholder="输入图片验证码" className="InputYZM"/>
							<div className='ImgSmsCode' title='因开发者没钱，无法实现自动获取，请手动点击获取图片验证码'>1234</div>
						</span>
						<span className="InputYZMWapper">
							<Input placeholder="输入验证码" className="InputYZM smsCodeInputValue" name='smsCode' onInput={this.changeSmsCodeFunc}/>
							<Button type="primary" disabled={this.state.disabled} onClick={this.sendSmsCode}>
								{this.state.SmsValue}
							</Button>
						</span>
						{this.state.des !== '' ? <span className='smsCodeInfo'>{this.state.des}</span> :''}
						<span className="checkBoxWapper">
							<Checkbox onChange={this.onChangeChecked} defaultChecked={true}></Checkbox>
							登录/注册即同意
							<a href='#'>用户协议</a>和<a href='#'>隐私政策</a>
						</span>
					</div>
					<div className="primarybtn">
						<Button type="primary" onClick={this.LodingFunc} disabled={this.state.LodingDisabled}>登录/注册</Button>
					</div>
					<div className="footer-info">	
						<span>版权所有鄂ICP备11005814号-10</span>
						<span>粤公网安备 44010402000077号</span>
						<span>广州屈臣氏个人用品商店有限公司</span>
						<span>地址：广州市越秀区东风东路丽丰中心</span>
					</div>
				</div>
			</div>
		)
	}
}
export default Loding;