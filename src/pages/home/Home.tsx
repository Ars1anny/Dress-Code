import React, { useEffect } from "react"
import css from './home.module.css'
import { useNavigate } from "react-router";
import { useDeleteProductMutation, useGetProductsQuery } from "../../redux/api/productApi";
import { useState } from 'react';
import Modal from "../../components/modal/Modal";
import AddProductForm from "../../components/forms/addProductForm/AddProductFrom";
import { useToggleFavoriteProductMutation } from "../../redux/api/favoriteProductsApi";
import { useToggleInBasketProductMutation } from "../../redux/api/inBasketProducts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface HomeProps {

}



const Home: React.FC<HomeProps> = () => {
    const navigate = useNavigate();
    const notify = () => toast('Ваш товар добавлен в корзину!');
    const { data: products = [], refetch } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [toogleFavoriteProduct] = useToggleFavoriteProductMutation();
    const [toggleInBasketProduct] = useToggleInBasketProductMutation();

    const [isOpen, setIsOpen] = useState(false);

    const showToastify = () => {
        notify();
    }


    const handleCloseModal = () => {
        setIsOpen(!isOpen);
    };

    const handleFavoriteProducts = () => {
        navigate('/favorites-products');
    }

    const handleToBasket = () => {
        navigate('/basket');
    }



    useEffect(() => {
        const isAuth = localStorage.getItem("isAuth");
        if (isAuth !== "true") {
            navigate("/login")
        }
        refetch();
    }, [navigate])


    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("isAuth")
        navigate("/login")
    }


    return <div>
        <div className={css.optionsBox}>
        <span className={css.options} onClick={handleCloseModal}>+ Добавить</span>
        <span className={css.options} onClick={handleFavoriteProducts}>Избранное</span>
        <span className={css.options} onClick={handleToBasket}>В корзине</span>
        <span  className={css.options} onClick={logout}>Выйти</span>
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <AddProductForm closeModal={handleCloseModal} />
        </Modal>

        </div>
        <div className={css.productsField}>
        {products.map((el: any) => {
            return <div className={css.container}>
                <div className={css.box}>
                <h2 className={css.title}>{el.productName}</h2>
                <img className={css.photo} src={el.photoUrl} alt={el.productName} />
                <p className={css.quantity}>Осталось:{el.quantity}</p>
                <p className={css.price}>{el.price}c</p>
                <button className={css.button} onClick={() => { toogleFavoriteProduct(el._id)}}>
                    <img className={css.heart} src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png" alt="favorite" />
                </button>
                <button className={css.deleteButton} onClick={() => {deleteProduct(el._id)}}>
                    <img className={css.heart} src="https://cdn-icons-png.flaticon.com/128/9623/9623100.png" alt="delete" />
                    Удалить
                </button>
                <button className={css.basketButton} onClick={() => {toggleInBasketProduct(el._id)}} onDoubleClick={showToastify}>
                <img className={css.heart} src="https://cdn-icons-png.flaticon.com/128/8071/8071101.png" alt="basket" />    
                    В корзину
                </button>
                <ToastContainer/>
                </div>
            </div>
        })}
        </div>
    </div>
}

export default Home;

