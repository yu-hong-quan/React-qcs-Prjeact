import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Button} from 'antd';

class Center extends Component{
    constructor(){
        super();
        this.state = {
            tokenType:1
        }
    }
    //对于是否已经登录的判断我们放在componentWillMount
    componentWillMount(){
        // token 验证
        axios({
            method:'get',
            url:'http://192.168.2.251:7001/center',
            headers:{
                'Authorization':localStorage['token']
            }
        }).then((resp)=>{
            if(resp.data.code === 0){//登录状态和过去成功
                this.setState({
                    tokenType:true,
                })
            }else{
               this.setState({
                   tokenType:false,
               })
            }
            console.log(this.state.tokenType);
        })
    }
    componentWillUnmount(){
		this.setState = (state,callback)=>{
			return;
		}
    }
    logout=()=>{
		localStorage['token'] = "";
		this.props.history.push('/Loding');
	}
    render(){
        if(this.state.tokenType){
            return(
                <div className='Center'>
                    <div>用户中心</div>
                    <Button type="primary"  onClick={this.logout}>退出</Button>
                </div>
            )
        }else{
            return <Redirect to='/Loding' />
        }
    }
}
export default Center;