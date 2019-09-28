import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationItem from './NavigationItem/NavigationItem';
import { firebase } from '../../../../firebase';
import style from './Navigation.sass'



const navigation = () => {
    var user = firebase.auth().currentUser;

    return (
        <AppBar position="fixed">
            <Toolbar className={style.menu_wrapper}>
                <div className={style.name} >
                    FIT APP
                </div>
                <NavigationItem link='/'>
                    HOME
                </NavigationItem>
                {user ?
                    (
                        <>
                            <NavigationItem link='/dashboard'>
                                Dashboard
                        </NavigationItem>
                            <NavigationItem link='/admin_exercises/add_exercise'>
                                Add Exercise
                            </NavigationItem>
                            <NavigationItem link='/admin_exercises'>
                                Exercises
                            </NavigationItem>
                            <NavigationItem link='/'>
                                Analitycs
                            </NavigationItem>
                            <NavigationItem link='/user_info'>
                                User info
                        </NavigationItem>
                            <NavigationItem link='/' logout={true} >
                                Logout
                        </NavigationItem>
                        </>
                    )

                    : (
                        <NavigationItem link='/sign_in'>
                            Sign In
                        </NavigationItem>
                    )}
            </Toolbar>
        </AppBar>
    );
}

export default navigation;