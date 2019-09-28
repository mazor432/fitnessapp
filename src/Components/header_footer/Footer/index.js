import React from 'react';
import style from './Footer.sass';
const footer = () => {
    return (
        <footer className={style.bck_blue}>
            <p className={style.text_info}>© 2019</p>
            <p className={style.text_info}>Przemyslaw Wnuk</p>
        </footer>
    );
};

export default footer;
