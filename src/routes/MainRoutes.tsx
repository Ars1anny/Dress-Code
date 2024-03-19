import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import Registration from "../pages/registration/Registration"
import Basket from "../pages/basket/Basket"
import FavotiresProducts from "../pages/favoritesProducts/FavoritesProducts"
import NotFound from "../pages/notFound/NotFound"


const MainRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/favorites-products" element={<FavotiresProducts />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes