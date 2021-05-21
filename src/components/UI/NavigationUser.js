import React from "react";
import Logout from "../../components/User/Logout";
import { useStores } from "../../hooks/use-stores";
import { Link } from "react-router-dom";

import { useObserver, observer } from "mobx-react";

const Copyright = observer(() => {
    const { userStore } = useStores();
    const loggedIn = userStore.isAuthenticated;
    const isadmin = userStore.user.role == "admin" ? true : false;
	const name = userStore.displayname;
	const isDebug = process.env.NODE_ENV == 'development' ? true : false;

    return (
        <div>
            {loggedIn ? (
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        id="navbarDropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {name}
                    </a>
                    <div
                        className="dropdown-menu dropdown-primary"
                        aria-labelledby="navbarDropdownMenuLink"
                    >
                        <Link
                            className="dropdown-item"
                            to="/organisation/securities"
                        >
                            Manage organisation and investment products
                        </Link>

                        {isadmin ? (
                            <Link
                                className="dropdown-item"
                                to="/manage/dashboard"
                            >
                                Administration ++
                            </Link>
                        ) : null}

                        {isDebug ? (
                            <Link
                                className="dropdown-item"
                                to="/statement/601a24be56a7ed31e6133b2a"
                            >
                                Shortcut Debug
                            </Link>
                        ) : null}

                        <Link className="dropdown-item" to="/logout">
                            Logout
                        </Link>
                    </div>
                </li>
            ) : null}
        </div>
    );
});

export default Copyright;
