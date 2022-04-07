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
import TabBar from "../components/tabbar/TabBar"
import WishList from "../components/wishlist/WishList"

const HomePage = () =>{
    return (
        <React.Fragment>
            <Header />
            <HomeBanner />
            <CartDetails />
            <HomeWork />
            <HomeIngredients />
            <BtnScroll />
            <QualityProducts />
            <HomeAnalysis />
            <HomeReview />
            <FooterApp />
            <TabBar />
            <WishList />
           <DialogShow />
        </React.Fragment>

       
    )
}

export default HomePage