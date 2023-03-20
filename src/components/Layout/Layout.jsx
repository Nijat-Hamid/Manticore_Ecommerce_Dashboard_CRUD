import { Flex,Box } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import { useState,memo } from "react";
function Layout({children}) {
    const [nav,setNav]= useState(false);
    return ( 
        <Flex>
            <Navbar setNav={()=>setNav(false)} navState={nav}/>
            <Box w={{base:"100%",lg:"calc(100% - 100px)"}} position={nav? "fixed":"static"} overflow={nav? "hidden":"auto"} ml={{base:"0",lg:"100px"}}>
                <Header setNav={()=>setNav(true)} />
                {children}
                <Footer />
            </Box>
        </Flex>
     );
}

export default memo(Layout);