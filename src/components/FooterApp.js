import './FooterAppStyle.scss';
import { MdPhoneInTalk } from 'react-icons/md';
import { HiMail } from 'react-icons/hi';
import { FaAddressCard } from 'react-icons/fa';
import { AiFillFacebook, AiOutlineTwitter } from 'react-icons/ai';
import { GrInstagram } from 'react-icons/gr';
import { ImYoutube } from 'react-icons/im';

const FooterApp = () => {
  return (
    <footer style={{ marginTop: '1rem' }}>
      <div className='wrapper_web'>
        <div className='footer_time'>
          <div className='time-date'>
            <div className='time-date_day'>
              <span>Chủ nhât</span>
              <span>***</span>
            </div>
            <span className='span_time'>Đóng cửa</span>
          </div>
          <div className='time-date'>
            <div className='time-date_day'>
              <span>Thứ hai</span>
              <span>***</span>
            </div>

            <span className='span_time'>8.00 - 20.00</span>
          </div>
          <div className='time-date'>
            <div className='time-date_day'>
              <span>Thứ ba</span>
              <span>***</span>
            </div>

            <span className='span_time'>8.00 - 20.00</span>
          </div>
          <div className='time-date'>
            <div className='time-date_day'>
              <span>Thứ tư</span>
              <span>***</span>
            </div>

            <span className='span_time'>8.00 - 20.00</span>
          </div>
          <div className='time-date'>
            <div className='time-date_day'>
              <span>Thứ năm</span>
              <span>***</span>
            </div>

            <span className='span_time'>8.00 - 20.00</span>
          </div>
          <div className='time-date'>
            <div className='time-date_day'>
              <span>Thứ sáu</span>
              <span>***</span>
            </div>

            <span className='span_time'>8.00 - 20.00</span>
          </div>
          <div className='time-date'>
            <div className='time-date_day'>
              <span>Thứ bảy</span>
              <span>***</span>
            </div>

            <span className='span_time'>8.00 - 20.00</span>
          </div>
        </div>
        <div className='footer_address'>
          <h3>Địa chỉ</h3>
          <div>
            <div className='info_number'>
              <span>
                <MdPhoneInTalk />
              </span>
              <p>0999999999</p>
            </div>
            <div className='info_number'>
              <span>
                <HiMail />
              </span>
              <p>support@contact.com</p>
            </div>
            <div className='info_number'>
              <span>
                <FaAddressCard />
              </span>
              <p>127 D2</p>
            </div>
          </div>
          <div className='icons'>
            <span className='icon_face'>
              <AiFillFacebook />
            </span>
            <span className='icon_tw'>
              <AiOutlineTwitter />
            </span>
            <span className='icon_ints'>
              <GrInstagram />
            </span>
            <span className='icon_youtube'>
              <ImYoutube />
            </span>
          </div>
        </div>
        <div className='footer_map'></div>
      </div>
    </footer>
  );
};

export default FooterApp;
