
import React from "react"
import Category from "../components/category/Category"
import FooterApp from "../components/FooterApp"
import Header from "../components/Header"
import DialogShow from "../components/dialog/DialogShow"
import CartDetails from "../components/CartDetails"
import BtnScroll from "../components/BtnScroll"
import TabBar from "../components/tabbar/TabBar"
import WishList from "../components/wishlist/WishList"
const CategoriesPage = () =>{
    return (
        <React.Fragment>
            <Header />
            <Category />
            <FooterApp />
            <CartDetails />
            <BtnScroll />
            <DialogShow />
            <TabBar />
            <WishList />
        </React.Fragment>
    )
}


export default CategoriesPage