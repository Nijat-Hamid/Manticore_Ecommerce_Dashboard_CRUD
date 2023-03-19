import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import { chakra, useColorModeValue } from "@chakra-ui/react";
import bgShapeLight from "./assets/img/effect-onlight.png";
import bgShapeDark from "./assets/img/effect-ondark.png";
import Layout from "./components/Layout/Layout.jsx";
import Products from "./pages/Products/Products.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Invoice from "./pages/Invoice/Invoice.jsx";
import SingleProducts from "./pages/SingleProduct/SingleProducts.jsx";
import TechStack from "./pages/TechStack/TechStack.jsx";
import Test from "./pages/Test/Test.jsx";

function App() {
  const bgShape = useColorModeValue(bgShapeLight, bgShapeDark);
  return (
    <chakra.div
      bgImage={bgShape}
      bgRepeat="no-repeat"
      bgAttachment="fixed"
      minH="100vh"
      bgPosition="top left"
      className="App"
    >
      <Router>
        <Layout>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/invoice" element={<Invoice/>} />
            <Route path="/products/:productID" element={<SingleProducts/>} />
            <Route path="/tech" element={<TechStack/>} />
            <Route path="/test" element={<Test/>} />
          </Routes>
        </Layout>
      </Router>
    </chakra.div>
  );
}

export default App;
