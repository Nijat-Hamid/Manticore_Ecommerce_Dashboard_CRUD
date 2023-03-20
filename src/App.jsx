import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { chakra, useColorModeValue, Spinner } from "@chakra-ui/react";
import bgShapeLight from "./assets/img/effect-onlight.png";
import bgShapeDark from "./assets/img/effect-ondark.png";
// import Home from "./pages/Home/Home.jsx";
// import Layout from "./components/Layout/Layout.jsx";
// import Products from "./pages/Products/Products.jsx";
// import Dashboard from "./pages/Dashboard/Dashboard.jsx";
// import Invoice from "./pages/Invoice/Invoice.jsx";
// import SingleProducts from "./pages/SingleProduct/SingleProducts.jsx";
// import TechStack from "./pages/TechStack/TechStack.jsx";
import { lazy, Suspense } from "react";

const HomeLazy = lazy(() => import("./pages/Home/Home.jsx"));
const ProductsLazy = lazy(() => import("./pages/Products/Products.jsx"));
const DashboardLazy = lazy(() => import("./pages/Dashboard/Dashboard.jsx"));
const InvoiceLazy = lazy(() => import("./pages/Invoice/Invoice.jsx"));
const TechStackLazy = lazy(() => import("./pages/TechStack/TechStack.jsx"));
const SingleProductsLazy = lazy(() =>
  import("./pages/SingleProduct/SingleProducts.jsx")
);
const LayoutLazy = lazy(() => import("./components/Layout/Layout.jsx"));
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
        <Suspense
          fallback={
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          }
        >
          <LayoutLazy>
            <Routes>
              <Route path="/" exact element={<HomeLazy />} />
              <Route path="/products" element={<ProductsLazy />} />
              <Route path="/dashboard" element={<DashboardLazy />} />
              <Route path="/invoice" element={<InvoiceLazy />} />
              <Route
                path="/products/:productID"
                element={<SingleProductsLazy />}
              />
              <Route path="/tech" element={<TechStackLazy />} />
            </Routes>
          </LayoutLazy>
        </Suspense>
      </Router>
    </chakra.div>
  );
}

export default App;
