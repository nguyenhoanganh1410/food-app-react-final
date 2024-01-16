import './HomeWorkStyle.scss';
import './QualityProductsStyle.scss';
import bestsell01 from '../imgage/bestsell01.png'; // gives image path
import { data_bestSeller } from '../data/data';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import React, { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../firebase/queries/products';
import { useNavigate } from 'react-router-dom';

const QualityProducts = () => {
  //items in carousel
  const [items, setItems] = useState(4);
  const [products, setProducts] = useState([data_bestSeller]);
  const navigate = useNavigate();

  useEffect(() => {
    const widthScreen = window.innerWidth;
    if (widthScreen < 768) {
      setItems(1);
    } else if (widthScreen > 1100) {
      setItems(4);
    } else if (widthScreen > 768 && widthScreen < 992) {
      setItems(3);
    }
    const handleResize = () => {
      const widthScreen = window.innerWidth;
      if (widthScreen < 768) {
        setItems(1);
      } else if (widthScreen > 1100) {
        setItems(4);
      } else if (widthScreen > 768 && widthScreen < 992) {
        setItems(3);
      }
    };
    window.addEventListener('resize', handleResize);

    //clean up func
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = useCallback(() => {
    navigate('/category/burgers');
  }, []);

  return (
    <section className='quality-products wrapper_web'>
      <div className='home-work_title'>
        <p>Các sản phẩm</p>
        <h2 style={{ marginTop: '18px' }}>
          Hãy tận hưởng các món <span>ngon</span> bây giờ
        </h2>
      </div>
      {/* autoPlay={true} interval={10000} showThumbs={false} infiniteLoop={true} */}
      <OwlCarousel items={items} className='owl-theme' loop autoplay={true}>
        {products &&
          products.map((val) => {
            return (
              <div key={val.id} onClick={handleClick} className='product_card'>
                <div className='card_top'>
                  <img src={bestsell01} />
                  <button className='btn_order'>Ưu thích</button>
                </div>
                <div className='card_content'>
                  <h3>carary burger</h3>
                  <p>The source code for each example is available here.</p>
                  <div className='card_price'>99,000đ</div>
                </div>
              </div>
            );
          })}
      </OwlCarousel>
    </section>
  );
};

export default React.memo(QualityProducts);
