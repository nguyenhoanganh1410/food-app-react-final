import React from "react"
import Header from "../components/Header"
import HomeBanner from "../components/HomeBanner"
import CartDetails from '../components/CartDetails'
import HomeWork from "../components/HomeWork"
import HomeIngredients from "../components/HomeIngredients"
import BtnScroll from "../components/BtnScroll"
import QualityProducts from "../components/QualityProducts"
import HomeAnalysis from "../components/HomeAnalysis"
import HomeReview from "../components/HomeReview"
import FooterApp from "../components/FooterApp"
import DialogShow from "../components/dialog/DialogShow"
import BannerPaths from "../components/category/BannerPaths"
import ProductDetail from "../components/detail/ProductDetail"
import CheckOut from "../components/checkout/CheckOut"
import TabBar from "../components/tabbar/TabBar"
import WishList from "../components/wishlist/WishList"
const CheckOutPage = () =>{
    return (
        <React.Fragment>
            <Header />
            <BannerPaths />
           
            <CartDetails />
            <CheckOut />
            <BtnScroll />
            <WishList />
            <FooterApp />
        <DialogShow />
        <TabBar />
    </React.Fragment>

    )
}

export default CheckOutPage;