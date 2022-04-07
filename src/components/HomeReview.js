import './HomeReviewStyle.scss'

import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import review01 from '../imgage/review01.jpg'; // gives image path
import { data_reviews } from '../data/data';

const HomeReview = () =>{
    return (
        <section className="home-reviews">
           
            <div className='wrapper_web'>
                <OwlCarousel 
                items={1}  
                     className="owl-theme"  
                    loop  
                    autoplay= {true}
                    >  
                    
                {
                    data_reviews.map(val =>{
                        return (
                        <div className='reviewPeople'>
                            <div className='review_img'>
                            <img src={val.img}/>
                            </div>
                            <div className='review_name'>
                                {val.name}
                            </div>
                            <div className='review_role'>{val.role}</div>
                            <p className='review_content'>
                                {val.text}
                            </p>
                        </div>
         
                       
                        )
                    })
                }
                
                    
                    



               </OwlCarousel> 
           </div>
        </section>
    )
}

export default HomeReview