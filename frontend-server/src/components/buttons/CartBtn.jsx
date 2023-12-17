import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartBtn = () => {
    // We get a state of addItems
    // Write the name of the file not the function
    const state = useSelector((state)=> state.addItem)
    const cartItemCount = state === undefined ? 0 : state.length;
    
    return (
        <>
            <NavLink to="/cart" className="btn btn-outline-primary ms-2">
                <span className="fa fa-shopping-cart me-1"></span> Cart ({cartItemCount})
            </NavLink>
        </>
    )
}

export default CartBtn
