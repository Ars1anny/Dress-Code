import React from "react"
import css from './basket.module.css'
import { useNavigate } from "react-router";
import { useGetInBasketProductsQuery } from "../../redux/api/inBasketProducts";

const Basket: React.FC = () => {
    const symvol = '< ';
    const navigate = useNavigate();
    const { data: products = [] } = useGetInBasketProductsQuery();

    const handleBackToHome = () => {
        navigate('/');
    }

    return <div>
        <div className={css.top}>
        <button className={css.back} onClick={handleBackToHome}>{symvol}Вернуться</button>
        <h1 className={css.pageName}>В корзине</h1>

        </div>
     <div className={css.productsField}>
        {products.map((el: any) => {
            return <div>
                <div className={css.container}>
                    <div className={css.box}>
                <h2 className={css.title}>{el.productName}</h2>
                <img className={css.photo} src={el.photoUrl} alt={el.productName} />
                <p className={css.quantity}>Осталось:{el.quantity}</p>
                <p className={css.price}>{el.price}с</p>
                    </div>
                </div>
            </div>
        })}    
        </div>
    </div>
    }

export default Basket;

