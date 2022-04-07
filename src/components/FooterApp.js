import './FooterAppStyle.scss'

import { MdPhoneInTalk } from 'react-icons/md';

import { HiMail } from 'react-icons/hi';

import { FaAddressCard } from 'react-icons/fa';
import { AiFillFacebook, AiOutlineTwitter } from 'react-icons/ai';
import { GrInstagram } from 'react-icons/gr';
import { ImYoutube } from 'react-icons/im';


const FooterApp = () =>{
    return (
        <footer>
            <div className='wrapper_web'>
                <div className='footer_time'>
                    <div className='time-date'>
                      <div className='time-date_day'>
                          <span>Sunday</span>
                          <span>***</span>
                      </div>
                        <span className='span_time'>closed</span>
                    </div>
                    <div className='time-date'>
                      <div className='time-date_day'>
                          <span>monday</span>
                          <span>***</span>
                      </div>
                        
                        <span className='span_time'>8.00 - 20.00</span>
                    </div>
                    <div className='time-date'>
                        <div className='time-date_day'>
                            <span>tuesday</span>
                            <span>***</span>
                        </div>
                       
                        <span className='span_time'>8.00 - 20.00</span>
                    </div>
                    <div className='time-date'>
                       <div className='time-date_day'>
                            <span>wednessday</span>
                            <span>***</span>
                        </div>
                       
                        <span className='span_time'>8.00 - 20.00</span>
                    </div>
                    <div className='time-date'>
                       <div className='time-date_day'>
                            <span>Thursday</span>
                            <span>***</span>
                        </div>
                       
                        <span className='span_time'>8.00 - 20.00</span>
                    </div>
                    <div className='time-date'>
                       <div className='time-date_day'>
                            <span>friday</span>
                            <span>***</span>
                        </div>
                       
                        <span className='span_time'>8.00 - 20.00</span>
                    </div>
                    <div className='time-date'>
                       <div className='time-date_day'>
                            <span>satuday</span>
                            <span>***</span>
                        </div>
                       
                        <span className='span_time'>8.00 - 20.00</span>
                    </div>
                   
                </div>
                <div className='footer_address'>
                    <h3>Address</h3>
                    <div>
                        <div className='info_number'>
                            <span><MdPhoneInTalk /></span>
                            <p>0397530256</p>
                        </div>
                        <div className='info_number'>
                            <span><HiMail /></span>
                            <p>hoanganh1410tb@gmail.com</p>
                        </div>
                        <div className='info_number'>
                            <span><FaAddressCard /></span>
                            <p>127 D2</p>
                        </div>
                    </div>
                    <div className='icons'>
                        <span className='icon_face'><AiFillFacebook /></span>
                        <span className='icon_tw'><AiOutlineTwitter /></span>
                        <span className='icon_ints'><GrInstagram /></span>
                        <span className='icon_youtube'><ImYoutube /></span>
                    </div>
                </div>
                <div className='footer_map'></div>
            </div>
        </footer>
    )
}


export default FooterApp