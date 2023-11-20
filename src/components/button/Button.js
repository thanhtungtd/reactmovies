import React from 'react';

const Button = ({className='', onClick, children, type="button", ...props}) => {
    return (
        <button 
            type={type}
            onClick={onClick} 
            className={`bg-primary py-3 px-5 font-bold rounded-lg mt-auto text-lg ${className}`}
            {...props}>
            {children}
        </button>

    );
};

export default Button;