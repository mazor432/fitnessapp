import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import style from './NavigationItem.sass'
import { logoutFirebase } from '../../../../ui/helpersFirebase';

const navigationItem = (props) => {
    return (
        <NavLink to={props.link}
            exact={props.exact} className={style.Menu_item} >
            {props.logout ?
                <Button className={style.button} onClick={logoutFirebase} >{props.children}</Button>
                :
                <Button className={style.button} >{props.children}</Button>
            }
        </NavLink>
    );
};

export default navigationItem;