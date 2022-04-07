import './HomeWorkStyle.scss'
import { howWorks } from '../data/data';
import { useEffect } from 'react';

const HomeWork = () =>{

    useEffect(()=>{
    //    console.log( document.querySelector(".home-work").getBoundingClientRect());
    }, [])
    return (
        <section className="home-work wrapper_web">
            <div className="home-work_title">
                <p>Order now!</p>
                <h2>how it works</h2>
            </div>
            <div className="home-work_steps row">

              {
                  howWorks.map((val, idx) =>{
                      return (
                        <div key={val.id} className="home-work_step showTo">
                          
                           <div className="home-work__thumb">
                                <img src={val.img}/>
                                <span>{`0${idx+1}`}<br /> step</span>
                                <div style={{backgroundImage: `url(${val.img_arrow})`}} className="step_arrow"></div>
                            </div>
                           
                            <p className="home-work__content">{val.title}</p>
                      </div>
                      )
                  })
              }
               

             
            </div>
        </section>
    )
}


export default HomeWork