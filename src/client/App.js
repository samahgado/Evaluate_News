import React from "react";
import { reactDom } from 'react-dom';
import Footer from "./component/footer";
import Header from "./component/header";
import Home from "./component/home";


const App = () => {
    return(
        <div>
            
            <Header/>
            <Home/>
            <Footer/>

        </div>
    )
}

export default App