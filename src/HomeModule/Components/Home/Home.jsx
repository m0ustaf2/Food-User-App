import React from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Home({ userData }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <Header
        prefix={"Welcome"}
        title={userData.userName}
        paragraph={`This is a welcoming screen for the entry of the application , you can now see the options`}
      />

      <div className="row  home-container mx-2 py-4 rounded-2 align-content-center align-items-center">
        <div className="col-md-6">
          <div>
            <h4>
              Fill the <span className="text-success">Recipes</span> !
            </h4>
            <p>
              you can now fill the meals easily using the table and form ,{" "}
              <br /> click here and sill it with the table !
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="text-end">
            <Link
              className="btn btn-success text-white text-decoration-none"
              to={"/dashboard/recipes"}
            >
              Fill Recipes <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
