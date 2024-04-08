import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarItem from "../NavbarItem";
import Logo from "../../Logo/";
import { userRoutes, adminRoutes, commonRoutes } from "../../../constant/route";
import { logout } from "../../../redux-store/reducers/User";
import "./navbar.css";
import * as localStorage from "../../../utils/localStorage";

export default function Navbar() {
  const user = useSelector(({ user }) => user.profile || {});
  const routes = user?.role
    ? adminRoutes.filter((route) => route?.role?.includes(user?.role))
    : [...userRoutes, ...commonRoutes];
  const dispatch = useDispatch();

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeValue("navin-product");
    dispatch(logout(dispatch));
  };

  console.log("routes", routes);

  return (
    <header>
      <div className="nav-wrapper">
        <div className="nav-left">
          <Logo />
        </div>
        <div className="nav-right">
          <ul className="nav-ul">
            {routes.map((route, index) =>
              !route.removeNavBar && !!user._id === route.isProtected ? (
                <NavbarItem
                  key={`route-${index}`}
                  to={route.to}
                  label={route.label}
                />
              ) : null
            )}
            {commonRoutes.map((route, index) => (
              <NavbarItem
                key={`route-common-${index}`}
                to={route.to}
                label={route.label}
              />
            ))}
            {user._id && (
              <NavbarItem to="/logout" onClick={onLogout} label="Logout" />
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
