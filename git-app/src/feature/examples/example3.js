import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//github username: zac-dodol, gaearon, sebmarkbage, bvaughn
const testData = [
    {id: 12314,name: "Zac Emoned", avatar_url: "https://avatars0.githubusercontent.com/u/46713066?v=4", company: "Avanade"},
];

//convert array of records into array of card components
const CardList = (props) => (
    <div>
        {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
    </div>
);

//render github information
class Card extends React.Component {
    render() {
        const profile = this.props;
        return (
            <div className="github-profile">
                <img alt="" src={profile.avatar_url} />
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>
        );
    }
}

//read input from user
class Form extends React.Component {
    state = {
        userName: ''
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await
            //normal
            // axios.get(`https://api.github.com/users/${this.state.userName}`);

            //catch
            axios.get(`https://api.github.com/users/${this.state.userName}`)
                .then(function (response) {
                    return response;
                })
                .catch(function (error) {
                    alert("User not Found");
                });

            //success error
            // axios.get(`https://api.github.com/users/${this.state.userName}`).then(
            //     Suc => {
            //         console.log('User Found');
            //         return
            //     },
            //     err =>
            //     {
            //         console.log('User Not Found');
            //         alert("User Not Found");
            //     }
            // );

        if (resp) {
            this.props.onSubmit(resp.data);
        }
        this.setState({userName:''});
    };

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Github Username"
                    value= {this.state.userName}
                    onChange={event => this.setState({ userName: event.target.value})}
                    required />
                <button>Add card</button>
            </form>
        )
    }
}

class App extends React.Component {

    state = {
        profiles: testData,
    };
    addNewProfile = (profileData) =>{
        this.setState(prevState => ({
            profiles: [...prevState.profiles, profileData],
        }))
    };

    render() {
        return (
            <div>
                <div className="header">{this.props.title}</div>
                <CardList profiles={this.state.profiles} />
                <Form onSubmit={this.addNewProfile}/>
            </div>
        );
    }
}

ReactDOM.render(
    <App title="The GitHub Cards App" />,
    document.getElementById('reactiveCards'),
);
