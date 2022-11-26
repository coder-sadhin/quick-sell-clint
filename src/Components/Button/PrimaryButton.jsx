import React from 'react';

const PrimaryButton = ({ children, classes, handler }) => {
    return (
        <button
            onClick={handler}
            className={`hover:text-gray-100 btn bg-gradient-to-r from-emerald-400 to-lime-400  text-white ${classes}`}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;