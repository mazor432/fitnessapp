import React, { Component } from 'react';
import { firebase } from '../../../firebase';
import Avatar from '@material-ui/core/Avatar';
import style from './User.sass';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';



class User extends Component {
    state = { user: null }


    componentWillMount() {
        let user = firebase.auth().currentUser;
        if (user) {
            this.setState({ user })
        };
    }



    render() {
        return (
            <Card >
                <CardContent className={style.pos} >
                    <Avatar alt="User Avatar" src={this.state.user.photoURL} className={style.big} />
                    <Typography color="textSecondary">
                        Hello {this.state.user.displayName ? this.state.user.displayName : this.state.user.email }
                    </Typography>

                </CardContent>
            </Card>
        );
    }
}

export default User;