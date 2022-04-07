import './HomeWorkStyle.scss'
import './QualityProductsStyle.scss'
import bestsell01 from '../imgage/bestsell01.png'; // gives image path
import { data_bestSeller } from '../data/data';

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import { useEffect, useState } from 'react';

const QualityProducts = () =>{
  //items in carousel
    const [items, setItems] = useState(4);

    useEffect(()=>{
      const widthScreen = window.innerWidth
      if(widthScreen < 768){
        setItems(1)
      }
      else if(widthScreen > 1100){
        setItems(4)
      }
      else if(widthScreen > 768 && widthScreen < 992){
        setItems(3)
      }
      const handleResize = () =>{
        
        const widthScreen = window.innerWidth
        if(widthScreen < 768){
          setItems(1)
        }
        else if(widthScreen > 1100){
          setItems(4)
        }
        else if(widthScreen > 768 && widthScreen < 992){
          setItems(3)
        }
      }
      window.addEventListener('resize', handleResize);

      //clean up func
      return () =>{
        window.removeEventListener('resize', handleResize)
      }
    }, [])
  
    return (
        <section className="quality-products wrapper_web">
            <div className="home-work_title">
                <p>Quality Products</p>
                <h2>Burger as expected <span>dilicious</span> one</h2>
            </div>
            {/* autoPlay={true} interval={10000} showThumbs={false} infiniteLoop={true} */}
            <OwlCarousel items={items}  
               className="owl-theme"  
                loop  
                autoplay= {true}
                >  
           
               
                 {
                   data_bestSeller.map(val =>{
                     return (
                        <div key={val.id} className='product_card'>
                            <div className='card_top'>
                              <img src={bestsell01}/>
                              <button className='btn_order'>best deal</button>
                            </div>
                            <div className='card_content'>
                                <h3>carary burger</h3>
                                <p>The source code for each example is available here.</p>
                                <div className='card_price'>$20.00</div>
                            </div>
    
                       </div>
                     )
                   })
                 }




                
           </OwlCarousel>  
                
               
          
             
     
        </section>
    )
}


export default QualityProducts