import React,{Component} from 'react';
import './Topadvertising.scss';

class TopAdvertising extends Component{
    render(){
        return (
            <div>
                <div className="TopAvertisingImg">
					<img src={this.props.AdvertisingData} />
				</div>
                <div>
					<img src={this.props.AdvertisingDataTwo} />
				</div>
            </div>
        )
    }
}
export default TopAdvertising;