import React from 'react'
import {render} from 'react-dom'
import axios from 'axios'
import Asset from './components/assets';


class App extends React.Component {

    handleClick() {
        const username = this.username.value;
        const pwd = this.password.value;
            alert('hell world' + username + pwd)
    }

    login() {
        // const username = this.username.value;
        // const password = this.password.value;
        const username = "root";
        const password = "Xiaokuihua";
            axios.post('http://127.0.0.1:8000/api-token-auth/', {
            "username": username,
            "password": password
        })
            .then(res => {
                // console.log(res);
                // console.log(axios.defaults.headers.common['Authorization']);
                axios.defaults.headers.common['Authorization'] = 'Token '+res.data.token;
                // console.log(axios.defaults.headers.common['Authorization']);
                if (res.data.token){
                    render(<Asset />, document.getElementById('app'))
                }
            });
    };

    assets() {
        // this.login();
        // const data;
        axios.defaults.headers.common['Authorization'] = 'Token d53e882f21f0247a72d49693d7f49c70be047566';
        axios.get('http://127.0.0.1:8000/assets/list/',
            // headers:{'Authorization': 'Token d53e882f21f0247a72d49693d7f49c70be047566'}
        ).then(res => {
            const data1 = res.data.data;

            // return res
            console.log(data1);
            this.setState({assets:data1});
            console.log(this.state);
            return true;
            // const listItems = data1.map((item) =>
            //     <li key={item.name}>{item.name}</li>
            // );
            // return(
            //     <div>
            //         <h1>Asset list</h1>
            //         <ul>{listItems}</ul>
            //     </div>
            // )
        });
        // console.log(data);
    }

    login_view() {
        return(
            <div>
                <h1>Asset list:</h1>
                <div className="container">
                    {/*<div className="rows">*/}
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-2">User Name</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="Email"
                                       ref={input => this.username = input} defaultValue="root"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2">Password</label>
                            <div className="col-sm-2">
                                <input type="password" className="form-control" id="inputPassword"
                                       ref={input => this.password = input} defaultValue="Xiaokuihua"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-primary" onClick={this.login.bind(this)}>登录</button>
                        </div>
                    </form>
                    {/*</div>*/}
                </div>
            </div>
        )
    }

    asset_list() {
        this.assets();
        const datafff = [{"id":"1", "name":"fff"}];
        console.log(datafff);
        const listItems = datafff.map((item) =>
            <li key={item.id}>{item.name}</li>
        );
        return(
            <ul>{listItems}</ul>
        )
    }


    render(){
        return(this.login_view())
    }
}

render(<App />, document.getElementById('app'));
