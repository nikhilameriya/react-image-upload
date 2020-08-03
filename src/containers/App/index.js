import React, {Component, Suspense} from 'react';
import routes from '../../router';
import { Route, Switch } from 'react-router-dom';

const Loading = (props) => {
    if(props.error){
        return <p>Error</p>
    }else{
        return <p/>
    }
}

class App extends Component{
    constructor(props){
        super(props)
    }   

    render(){
        return(
            <div className={'AppIndex'}>
                <Suspense fallback={<Loading />}>
                    <Switch>
                    {
                        routes.map(r => <Route exact={r.exact} key={r.path} path={r.path} component={r.component}/>)
                    }
                    </Switch>
                </Suspense>
            </div>
        )
    }

}

export default App 