import React, {Component} from 'react';
import NavBar from '../../components/NavBar';
import Card from '../../components/Card';


class Home extends Component{
    constructor(props){
        super(props);
        this.dashboardItems = ["Upload","View Uploads","About"];
    }
    
    render(){
        const {classes} = this.props;
        return(
            <div>
                <NavBar showHeader={true} title={"Home"}/>
                <Card items={this.dashboardItems}/>
            </div>
        )
    }
}

export default Home;