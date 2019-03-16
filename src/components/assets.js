import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class AssetStatus extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        if (this.props.status == 1){
            return(
                <td className="success">运行中</td>
                )
        }else{
               return(
                    <td className="danger">停止</td>
                   )
        }
    }
}

class TrData extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            this.props.users.map((user)=> {
                return (
                    <tr key={user.id} className="text-center">
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <AssetStatus status={user.status}/>
                        <td>{user.type}</td>
                    </tr>
                )
            })
        )
    }
}



class Asset extends React.Component {
    constructor(props){
        super(props);
        this.state={
            users:[],
            isLoaded:false
        }
    }

    componentDidMount(){
        const _this=this;

        axios.get('http://127.0.0.1:8000/assets/list/')
            .then(function (response) {
                // console.log(response);
                _this.setState({
                    users:response.data.data,
                    isLoaded:true
                });
            })
            .catch(function (error) {
                // console.log(error);
                _this.setState({
                    isLoaded:false,
                    error:error
                })
            })

    }

    render() {
        if(!this.state.isLoaded){
            return <div>Loading</div>
        }else{
            return (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">名称</th>
                        <th className="text-center">状态</th>
                        <th className="text-center">类型</th>
                    </tr>
                    </thead>
                    <tbody>
                        <TrData users={this.state.users}/>
                    </tbody>
                </table>
            )
        }
    }



}

export default Asset;
