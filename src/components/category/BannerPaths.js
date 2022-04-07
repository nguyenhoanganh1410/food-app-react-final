import './BannerPathsStyle.scss'

import {Link} from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { useContext } from "react";
import Contex from '../../store/Context';

const BannerPaths = () => {

    //get url global value
  const { state, depatch } = useContext(Contex);
  //detructering...
  const { url } = state;


  return (
    <div className="banner-paths_warpper">
      <div className="banner_paths">
        <Link to="/">
          <span>home</span>
        </Link>
        <BsThreeDots className="dot" />
        <span>shop</span>
        {/* <span className='dot'><BsThreeDots /></span> */}
        <BsThreeDots className="dot" />
        <span className="active">{url}</span>
      </div>
    </div>
  );
};

export default BannerPaths;
