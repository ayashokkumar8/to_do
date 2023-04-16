import React from 'react';
import tick from 'assets/images/tick.svg';
import './styles.scss';

const CardComponent = ({ header, subheader, children }) => {
    return (
        <>
            <div className='card-container'>
                <div className='card'>
                    <img className='card-img' src={tick} />
                    <h2 className='header'>{header}</h2>
                    {subheader && <p className='subheader'>{subheader}</p>}
                    {children}
                </div>
            </div>
        </>

    )
}

export default CardComponent;