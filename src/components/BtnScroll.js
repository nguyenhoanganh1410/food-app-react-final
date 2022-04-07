import { GiBloodyStash, GiBodyBalance } from 'react-icons/gi';
import { IoIosArrowUp } from 'react-icons/io';
import './BtnScrollStyle.scss'

const BtnScroll = () =>{
    const handlOnTop = () =>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
          });
    }
    return (
        <div className="btn-scroll"
             onClick={() => handlOnTop()}
        >
           <span> <IoIosArrowUp /></span>
        </div>
    )
}

export default BtnScroll