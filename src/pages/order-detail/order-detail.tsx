import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { wsActionType } from "../../redux/middleware/socket-middleware";

import styles from "./order-detail.module.scss";
import { TIngredientsInOrder, TOrder } from "../../utils/types";
import Preloader from "../../component/preloader/preloader";
import { nanoid } from "nanoid";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FullOrderPrice } from "../../utils/full-order-price";
import classnames from "classnames";

const OrderDetailPage: FC = () => {
    const { feedId } = useParams();
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector((store: RootState) => store.feed);
    const [currentOrder, setCurrentOrder] = useState<TOrder | null | undefined>(null);
    const { ingredients } = useAppSelector((store: RootState) => store.ingredients);

    useEffect(() => {
        dispatch({ type: wsActionType.wsConnecting });
        dispatch({ type: wsActionType.wsClose });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        orders && setCurrentOrder(orders.find((order) => order._id === feedId));
    }, [orders]);

    return (
        <section className={classnames(styles.orderDetail)}>
            {!currentOrder && !ingredients && <Preloader />}
            {currentOrder && ingredients && (
                <div className={styles.order}>
                    <p className={classnames("text text_type_digits-default", styles.orderNumber)}>{`#${currentOrder.number}`}</p>
                    <p className="text text_type_main-medium mt-10">{currentOrder.name}</p>
                    <p className={classnames("text text_type_main-small mt-3", styles.orderStatus)}>
                      {currentOrder.status === "done" && "Выполнен"}
                      {currentOrder.status === "pending" && "В работе"}
                    </p>
                    <div>
                        <p className="text text_type_main-medium mt-15">Состав:</p>
                        {ingredients && (
                            <IngredientsInOrder
                                ingredients={ingredients}
                                orderIngredients={currentOrder.ingredients}
                            />
                        )}
                    </div>
                    <div className={classnames(styles.orderInfo, "mt-10 mb-10")}>
                        <p className="text text_type_main-default text_color_inactive">
                            <FormattedDate date={new Date(currentOrder.createdAt)} />
                        </p>

                        <p className="text text_type_digits-default">
                            {FullOrderPrice(ingredients, currentOrder.ingredients)}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

const IngredientsInOrder: FC<TIngredientsInOrder> = ({ ingredients, orderIngredients }) => {
    const ingredientInOrder = ingredients?.filter((item) => orderIngredients.includes(item._id));
    return (
        <div className={styles.orderIngredients}>
            {ingredientInOrder.map((item, i) => (
                <div className={classnames(styles.orderIngredientItem,'mt-6')} key={nanoid()}>
                    <div className={styles.leftBlock}>
                        <img
                            src={item.image}
                            alt={item.name}
                            className={styles.orderIngredientImg}
                        />
                        <p className="text text_type_main-small ml-4">{item.name}</p>
                    </div>
                    <div className={styles.rightBlock}>
                        <p className="text text_type_digits-default mr-2">{item.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderDetailPage;
