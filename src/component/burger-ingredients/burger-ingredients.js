import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list'
import TabsWrapper from '../tabs-wrapper/tabs-wrapper'
import dataPropTypes from '../../utils/constants';
import classnames from 'classnames';
import Modal from '../modal/modal';

import styles from './burger-ingredients.module.scss'


const BurgerIngredients = ({ data }) => {

    const [current, setCurrent] = useState('bun');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState('null');

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                closeModal()
            }
        }
        window.addEventListener('keydown', close)

        return () => window.removeEventListener('keydown', close)
    }, [])

    return (

        <section className={styles.burgerIngredientsSection}>
            <h1 className="mt-10">Соберите бургер</h1>

            <TabsWrapper current={current} setCurrent={setCurrent} />

            <BurgerIngredientsList data={data}
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={closeModal}
                setSelectedId={setSelectedId}
                selectedId={selectedId} />

            {isModalOpen &&
                <ModalIngredientInf data={data}
                    selectedId={selectedId}
                    isModalOpen={isModalOpen}
                    openModal={openModal}
                    closeModal={closeModal} />
            }


        </section>
    )
}

const ModalIngredientInf = (props) => {

    const { data, selectedId, isModalOpen, openModal, closeModal } = props;
    const selectedIngredientData = data.find(item => item._id === selectedId);

    return (
        <>

            <Modal title={'Детали ингредиента'}
                isHeader={true}
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={closeModal}>

                <div className={styles.ingredientModalContent}>
                    <div className={styles.ingredientModalImg}>
                        <img src={selectedIngredientData.image_large} />
                    </div>
                    <div className={classnames(styles.ingredientModalTitle, 'text text_type_main-medium')}>
                        {selectedIngredientData.name}
                    </div>
                </div>

                <div className={styles.ingredientComposition}>
                    <div className={styles.ingredientCompositionItem}>
                        <div className="text text_type_main-small">Калории,ккал</div>
                        <div className="text text_type_digits-medium">{selectedIngredientData.calories}</div>
                    </div>
                    <div className={styles.ingredientCompositionItem}>
                        <div className="text text_type_main-small">Белки, г</div>
                        <div className="text text_type_digits-medium">{selectedIngredientData.proteins}</div>
                    </div>
                    <div className={styles.ingredientCompositionItem}>
                        <div className="text text_type_main-small">Жиры, г</div>
                        <div className="text text_type_digits-medium">{selectedIngredientData.fat}</div>
                    </div>
                    <div className={styles.ingredientCompositionItem}>
                        <div className="text text_type_main-small">Углеводы, г</div>
                        <div className="text text_type_digits-medium">{selectedIngredientData.carbohydrates}</div>
                    </div>
                </div>
            </Modal>

        </>

    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes)
};

ModalIngredientInf.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired,
    selectedId: PropTypes.string.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export default BurgerIngredients;