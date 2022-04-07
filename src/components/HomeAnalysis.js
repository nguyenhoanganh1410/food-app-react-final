import './HomeAnalysisStyle.scss'
import { data_analysis } from '../data/data';

import { MdOutlineArrowRight } from 'react-icons/md';
import { useEffect } from 'react';


import React, { useState } from "react";

import AnimatedNumber from "animated-number-react";
const HomeAnalysis = () =>{


    const [animate, setAnimate] = useState(false)



     //add scrool event in DOM
   useEffect( () =>{
    const handScroll =() =>{
       // console.log(window.scrollY);
        if(window.scrollY > 2300){
           setAnimate(true)
            
        }
    }
    window.addEventListener('scroll', handScroll)

    //cleanup function
    return () =>{
        window.removeEventListener('scroll', handScroll)
    }
   }, [])
  


  return (
        <section className='home-analysis'>
           
                <div className='home-analysis-wrapper'>
                    <div className='analysis_content'>
                        <div className='content_text'>
                            <p>Sandwich</p>
                            <span>$45</span>
                            <div className='play_video'><MdOutlineArrowRight /></div>
                        </div>
                       
                        <div className='block first_child'></div>
                        <div className='block second_child'></div>
                        <div className='block third_child'></div>
                        
                    </div>
                    <div className='analysis_video'></div>
                </div>
                <div className='home-analysis-container'>
                    <div className='wrapper_web row'>
                        {
                           
                            data_analysis.map(val =>{
                                return (
                                    <div key={val.id} className='analysis_number col-sm-6'>
                                        <div className='number'>
                                                <span className='cupOfCoffee'>
                                                    {
                                                        animate ? <AnimatedNumber
                                                        value={val.number}
                                                        duration  = {5000}
                                                        formatValue={ v =>{
                                                            return v.toFixed(0)
                                                        }}
                                                        />
                                                        :
                                                        null
                                                    }
                                                        
                                                </span>
                                                <span>+</span>
                                        </div>
                                        <p className='title'>{val.title}</p>
                                    </div>

                                )
                            })
                        }

                    </div>
                </div>

            
        </section>
    )
}


export default HomeAnalysis