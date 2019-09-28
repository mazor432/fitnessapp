import React, { Component } from 'react';
import Search from './Search/Search';
import User from './User/User';
import style from './dashboard.sass'
class Dashboard extends Component {
    render() {
        return (
            <div className={style.wrapper}>
                <div className={style.left_side}>
                    <User />
                    <Search />
                </div>
                <div className={style.right_side}>
                    <img src="/images/bodybuilder.jpg" className={style.body_image} alt="" />
                </div>


            </div>
        );
    }
}

export default Dashboard;