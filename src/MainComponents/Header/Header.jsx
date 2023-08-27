/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MainContext } from "../../AppData/AppContext";

const Header = () => {
  let {
    Data: { LanguageData, IsLoggin, AppName },
  } = useContext(MainContext);
  let [LinksHeader, SetLinksHeader] = useState([]);
  useEffect(() => {
    if (IsLoggin) {
      SetLinksHeader(LanguageData.Links.IfLogin);
    } else {
      SetLinksHeader(LanguageData.Links.IfNotLogin);
    }
  }, [IsLoggin]);
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {AppName}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {LinksHeader.map((Link, i) => {
              return (
                <li className="nav-item" key={i}>
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to={Link.path}
                  >
                    {Link.Name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
