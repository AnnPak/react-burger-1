import classnames from "classnames";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.scss";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
    const { pathname } = useLocation();
    return (
        <nav className="mt-4">
            <div className={styles.navbarItem}>
                <NavLink
                    className={classnames(
                        styles.navbarItemLink,
                        pathname.indexOf("/profile") === -1 && styles.navbarItemLinkActive,
                        "mr-2 p-4 pl-0"
                    )}
                    to="/"
                >
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </NavLink>

                <NavLink
                    className={classnames(
                        styles.navbarItemLink,
                        pathname.indexOf("/feed") > -1 && styles.navbarItemLinkActive,
                        "mr-2 p-4 pl-0 active"
                    )}
                    to="/feed"
                >
                    <ListIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Лента заказов</p>
                </NavLink>
            </div>

            <div className={styles.navbarItem}>
                <NavLink
                    className={classnames(
                        styles.navbarItemLink,
                        pathname.indexOf("/profile") > -1 && styles.navbarItemLinkActive,
                        "mr-2 p-4 pl-0 active"
                    )}
                    to="/profile"
                >
                    <ProfileIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Личный кабинет</p>
                </NavLink>
            </div>
        </nav>
    );
};

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className="pt-5 pb-5">
                <Logo />
            </div>
            <Navbar />
        </header>
    );
};

export default AppHeader;
