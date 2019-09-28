import React from 'react';
import Header from '../../Components/header_footer/Header';
import Footer from '../../Components/header_footer/Footer';
import style from './Layout.sass'

const Layout = (props) => {
    return (
        <div className={style.container}>
            <Header />
            <div className={style.wrapper}>  {props.children}</div>
            <Footer />
        </div>
    );
};

export default Layout;