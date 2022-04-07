import './DialogShowStyle.scss'

import React, { useContext } from "react"
import Contex from '../../store/Context'
import { SetDialogShow } from '../../store/Actions'


import {
    Routes,
    Route,
    Link,
    Outlet
  } from "react-router-dom";


const DialogShow = () =>{
    const {state, depatch} = useContext(Contex)
    //detructering...
    const {showDialog} = state

    const handleCacel = () =>{
        //set diaologshow
        depatch(SetDialogShow(false))
    }
    return (
       
            
                showDialog ? (
                    <section className='dialog_show showTo'>
                        <div className='dialog_overlay'
                            onClick={() => handleCacel()}
                        ></div>
                        <div className='dialog_wrapper animation_dialog-wrapper'>
                            <h2 className='dialog_title'>join with us</h2>
                            <p className='dialog_description'>You are not signed in. Please sign in to use this feature!</p>
                            <div className='dialog_btns'>
                                <button className='btn'
                                    onClick={() => handleCacel()}
                                >cancel</button>
                                   <Link to="/login" className='btnLogin' >
                                         <button className='btn'>log in</button>
                                   </Link>
                            </div>
                        </div>
                    </section>
                ):null
            
       
    )
    
}


export default DialogShow