import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { dataPropTypes } from '../../utils/constants';
import requestData from '../../utils/request';
import { ordersApi } from '../../utils/constants';
import { addOrderToModal } from '../../services/actions/index'
import { getOrderSuccess, getOrderRequest, getOrderFailed } from '../../services/actions/index'

import styles from './burger-constructor.module.scss';

const BurgerConstructorResult = ({ resultIngredientsData }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    
    const createOrder = () => {
        //const idsObject = resultIngredientsData.map(item => item._id); //список id ингредиентов в заказе
        
        const requestBody = JSON.stringify({ "ingredients": ["60d3b41abdacab0026a733c6"] })

        
        dispatch(getOrderRequest())

        requestData(ordersApi, requestBody, 'POST')
            .then(order => dispatch(getOrderSuccess(order)))
            .catch(() => dispatch(getOrderFailed()))

        addOrderToModal()
       
    }

    useEffect(() => {
        const getAllPrice = resultIngredientsData.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
        
        setTotalPrice(getAllPrice)
    }, [resultIngredientsData])

    return (
        <section className={classnames(styles.constructorResult, 'mt-10')}>
            <div className={classnames(styles.constructorResultPrice, 'mr-10')}>
                <p className="text text_type_main-large mr-2">{totalPrice}</p>
                <CurrencyIcon type="primary" />
            </div>

            <Button
                type="primary"
                size="large"
                htmlType='button'
                onClick={createOrder}>
                Оформить заказ
            </Button>
        </section>

    )
}

BurgerConstructorResult.propTypes = {
    resultIngredientsData: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerConstructorResult