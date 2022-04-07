import FooterApp from "../components/FooterApp"

import React from "react"
import LoginForm from "../components/login/LoginForm"
const LoginPage = () =>{
    return (
        <React.Fragment>
            <LoginForm />
            <FooterApp />
        </React.Fragment>
    )
}

export default LoginPage