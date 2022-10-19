import React, { useEffect, useCallback } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { addComponent, replaseBunComponent, setOrderIngredients, updateConstructorList } from '../../services/actions/index'
import BurgerConstructorElement from './burger-constructor-element';
import styles from './burger-constructor.module.scss';

const BurgerConstructorWpaper = () => {

    const { burgerIngredients, ingredientsWithOutBun } = useSelector(store => store);
    const dispatch = useDispatch();

    const [{ isHover }, dropTargerRef] = useDrop({
        accept: "ingredients",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(ingredient) {
            if (burgerIngredients.find(item => item.type === 'bun') && ingredient.type === 'bun') {
                dispatch(replaseBunComponent(ingredient));
            } else {
                dispatch(addComponent(ingredient));
            }

        },
    });

    const elementTypeBun = burgerIngredients ? burgerIngredients.find(item => item.type === 'bun') : [];

    //формирую массив с ингредиетами для заказа
    useEffect(() => {
        if (elementTypeBun) {
            const resultIndredients = [...burgerIngredients, elementTypeBun]
            dispatch(setOrderIngredients(resultIndredients));
        } else {
            dispatch(setOrderIngredients(burgerIngredients));
        }
    }, [burgerIngredients, elementTypeBun, dispatch])

    const moveCard = useCallback((dragIndex, hoverIndex, ingredientsWithOutBun) => {
        const dragCard = ingredientsWithOutBun[dragIndex];
        const newCards = [...ingredientsWithOutBun]

        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)

        

        dispatch(updateConstructorList(newCards))
    }, [dispatch]);

    

    const renderCard = useCallback((item, index) => {
        return (
            <BurgerConstructorElement
                moveCard={moveCard}
                classname={classnames(styles.constructorElement)}
                ingredient={item}
                index={index}
                isHover={isHover}
                key={uuidv4()}
                svg={true} />
        )
    }, [])

    return (

        <section className={styles.constructorElements} >

            {elementTypeBun &&
                <BurgerConstructorElement
                    moveCard={moveCard}
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={uuidv4()}
                    type='top'
                    isLocked={true}
                    ingredient={elementTypeBun} />

            }

            <div className={classnames(styles.constructorElements, 'pr-2')} ref={dropTargerRef}>
                {ingredientsWithOutBun &&

                    ingredientsWithOutBun
                        .map((item, index) => renderCard(item, index))

                }
            </div>

            {elementTypeBun &&
                <BurgerConstructorElement
                    moveCard={moveCard}
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={uuidv4()}
                    type='bottom'
                    ingredient={elementTypeBun}
                    isLocked={true} />

            }

        </section>
    )


}



export default BurgerConstructorWpaper;