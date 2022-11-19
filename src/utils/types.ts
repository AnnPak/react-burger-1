export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    key: string | number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
};

export type TTITLE_LIST = {
    [name: string]: string;
};

export type TMoveCard = (
    dragIndex: number,
    hoverIndex: number | undefined,
    constructorIngredients: TIngredient[]
) => any;

export type TBurgerConstructorElementProps = {
    ingredient: TIngredient;
    position?: "top" | "bottom";
    classname?: string;
    index?: number;
    moveCard: TMoveCard;
};

export type TOptionsProps = {
    method: string;
    mode: string;
    headers: {
        "Content-Type": string;
        Authorization?: string | undefined;
    };
    body: any;
};

export type TTabsWrapper = {
    typesOfIngredients: Array<string> | null;
    tabsValue: string | null;
};

export type TScrollIntoViewOptions = boolean | ScrollIntoViewOptions;

export type TLinkItem = {
    className: string;
    to: string;
};

export type TInitalState = {
  constructorIngredients: null | Array<TIngredient>
  bun: null | TIngredient
}


