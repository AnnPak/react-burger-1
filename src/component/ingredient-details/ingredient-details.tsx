import { FC, useEffect, useState } from "react";
import classnames from "classnames";
import { useParams } from "react-router-dom";

import { TIngredient } from "../../utils/types";

import styles from "./ingredient-details-modal.module.scss";
import { useAppSelector } from "../../redux/store";

const IngredientDetails: FC = () => {
    const { ingredientId } = useParams();
    const { ingredients } = useAppSelector((store) => store.ingredients);
    const [ingredient, setIngredient] = useState<TIngredient | null | undefined>(null);

    useEffect(() => {
        ingredients &&
            setIngredient(ingredients.find((item: TIngredient) => item._id === ingredientId));
    }, [ingredients, ingredientId]);

    return ingredient ? (
        <>
            <div className={styles.ingredientModalContent}>
                <div className={styles.ingredientModalImg}>
                    <img src={ingredient?.image_large} alt={ingredient?.name} />
                </div>
                <div
                    className={classnames(
                        styles.ingredientModalTitle,
                        "text text_type_main-medium"
                    )}
                    data-test="ingredient-name"
                >
                    {ingredient?.name}
                </div>
            </div>

            <div className={styles.ingredientComposition}>
                <div className={styles.ingredientCompositionItem}>
                    <div className="text text_type_main-small">Калории,ккал</div>
                    <div className="text text_type_digits-medium" data-test="calories">{ingredient?.calories}</div>
                </div>
                <div className={styles.ingredientCompositionItem}>
                    <div className="text text_type_main-small">Белки, г</div>
                    <div className="text text_type_digits-medium" data-test="proteins">{ingredient?.proteins}</div>
                </div>
                <div className={styles.ingredientCompositionItem}>
                    <div className="text text_type_main-small">Жиры, г</div>
                    <div className="text text_type_digits-medium" data-test="fat">{ingredient?.fat}</div>
                </div>
                <div className={styles.ingredientCompositionItem}>
                    <div className="text text_type_main-small">Углеводы, г</div>
                    <div className="text text_type_digits-medium" data-test="carbohydrates">{ingredient?.carbohydrates}</div>
                </div>
            </div>
        </>
    ) : (
        <>Ингредиент не найден</>
    );
};

export default IngredientDetails;
