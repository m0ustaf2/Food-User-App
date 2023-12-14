import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
import Header from "../../../SharedModule/Components/Header/Header";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import noData from "../../../assets/images/nodata.png";

export default function RecipesList() {
  const [RecipesList, setRecipesList] = useState([]);
  const [TagsList, setTagsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [modalState, setModalState] = useState("close");
  const [itemId, setItemId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pagesArray, setPagesArray] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [selectedTagId, setselectedTagId] = useState(0);
  const [selectedCatId, setselectedCatId] = useState(0);
  const [recipesDetalis, setRecipesDetails] = useState();
  const [currentPg,setCurrentPg]=useState(1);

  const handleClose = () => setModalState("close");
  let { headers, baseUrl } = useContext(AuthContext);
  const showViewModal = (id) => {
    setItemId(id);
    setModalState("view-modal");
    getRecipesDetails(id);
  };

  //--------------------getAllRecipes---------------------
  const getAllRecipes = (currentPg, name, tagId, categoryId) => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/api/v1/Recipe/`, {
        headers,
        params: {
          pageSize: 5,
          pageNumber: currentPg,
          name: name,
          tagId: tagId,
          categoryId: categoryId,
        },
      })
      .then((response) => {
        setRecipesList(response?.data?.data);
        setIsLoading(false);
        setPagesArray(
          Array(response.data.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Axios Error!!!");
        setIsLoading(false);
      });
  };
  // --------change-page--------
  const changePage=(pgindex)=>{
    console.log(pgindex);
    setCurrentPg(pgindex);
    getAllRecipes(pgindex);
  }
  // --------handle-next-btn--------
  const nextPages=()=>{
    setCurrentPg(parseInt(currentPg)  + 1);
    getAllRecipes(parseInt(currentPg)  + 1);
  }
  // --------handle-previous-btn--------
  const previousPages=()=>{
    setCurrentPg(parseInt(currentPg)  - 1);
    getAllRecipes(parseInt(currentPg)  - 1);
  }
  //--------------------getRecipesDetails---------------------
  const getRecipesDetails = (id) => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/api/v1/Recipe/${id}`, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        setRecipesDetails(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Axios Error!!!");
        setIsLoading(false);
      });
  };
  //--------------------addToFavorites---------------------
  const addToFavorites = () => {
    console.log(itemId);
    setIsLoading(true);
    axios
      .post(
        `${baseUrl}/api/v1/userRecipe`,
        {
          recipeId: itemId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Recipe add successfully to your favourites");
        setIsLoading(false);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "Axios Error!!!");
        setIsLoading(false);
      });
  };
  //-------------------getalltags-----------
  const getAllTags = () => {
    axios
      .get(`${baseUrl}/api/v1/tag/`, {
        headers,
      })
      .then((response) => {
        setTagsList(response?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Axios Error!!!");
      });
  };
  //----------------getall categories---------
  const getCategories = () => {
    axios
      .get(`${baseUrl}/api/v1/Category/?pageSize=20&pageNumber=1`, {
        headers,
      })
      .then((response) => {
        setCategoriesList(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Axios Error!!!");
      });
  };
  // *********************searchByName*******************
  const getNameValue = (input) => {
    console.log(input.target.value);
    setSearchString(input.target.value);
    getAllRecipes(1, input.target.value, selectedTagId, selectedCatId);
  };
  // ********************SearchByTagId********************
  const getTagValue = (select) => {
    setselectedTagId(select.target.value);
    getAllRecipes(1, searchString, select.target.value, selectedCatId);
  };
  // ********************SearchByCategoryId********************
  const getCategoryValue = (select) => {
    setselectedCatId(select.target.value);
    getAllRecipes(1, searchString, selectedTagId, select.target.value);
  };
  // -------------------------------------------------
  useEffect(() => {
    getAllRecipes();
    getCategories();
    getAllTags();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Recipes List</title>
      </Helmet>
      <Header
        prefix={"Recipes"}
        title={"Items"}
        paragraph={`You can now add your items that any user can order it from the Application and you can edit`}
      />
      {/* ************************View Modal******************************* */}
      <Modal show={modalState == "view-modal"} onHide={handleClose}>
        <Modal.Body>
          <h4>Recipe Details:</h4>
          <div className="text-center">
            {recipesDetalis?.imagePath ? (
              <img
                className="w-50 rounded-2"
                src={`${baseUrl}/` + recipesDetalis?.imagePath}
                alt="recipe-img"
              />
            ) : (
              <img className="w-50" src={noData} alt="avatar" />
            )}
          </div>
          <p>
            Description:
            <span className="text-success mx-1">
              {recipesDetalis?.description}
            </span>{" "}
          </p>
          <p>
            Category:{" "}
            <span className="text-success mx-1">
              {" "}
              {recipesDetalis?.category[0]?.name}
            </span>
          </p>
          <p>
            Tag:{" "}
            <span className="text-success mx-1">
              {" "}
              {recipesDetalis?.tag?.name}{" "}
            </span>{" "}
          </p>
          <hr />
          <div className="form-group my-3 text-end">
            <button
              onClick={addToFavorites}
              className={
                "btn btn-outline-success" + (isLoading ? " disabled" : "")
              }
            >
              {isLoading == true ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Add To Favorite"
              )}
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="row mx-2 p-3">
        <div className="col-md-12">
          <div>
            <h6 className="fw-bold">Recipes Table Detailes</h6>
            <span>You can check all details</span>
          </div>
        </div>
        <div>
          <div className="row my-2">
            <div className="col-md-4 responsiv my-1">
              <input
                onChange={getNameValue}
                placeholder="Search by Recipe name..."
                className="form-control border-success"
                type="text"
              />
            </div>
            <div className="col-md-4 responsiv my-1">
              <select
                onChange={getTagValue}
                className="form-select border-success"
              >
                <option value={""}>Search by Tagig</option>
                {TagsList.map((tag, index) => (
                  <option value={tag.id} key={index}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 responsiv my-1">
              <select
                onChange={getCategoryValue}
                className="form-select border-success"
              >
                <option value={""}>Search by categoriesIds</option>
                {categoriesList.map((category, index) => (
                  <option value={category.id} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {!isLoading ? (
            <>
              {RecipesList.length > 0 ? (
                <div>
                  <div className="table-responsive tble-res">
                    <table className="table  table-success table-striped-columns ">
                      <thead>
                        <tr>
                          <th className="table-secondary p-3" scope="col">
                            #
                          </th>
                          <th className="table-secondary p-3" scope="col">
                            Item Name
                          </th>
                          <th className="table-secondary p-3" scope="col">
                            Image
                          </th>
                          <th className="table-secondary p-3" scope="col">
                            Price
                          </th>
                          <th className="table-secondary p-3" scope="col">
                            Description
                          </th>
                          <th className="table-secondary p-3" scope="col">
                            Category
                          </th>
                          <th className="table-secondary p-3" scope="col">
                            Tag
                          </th>
                          <th
                            className="table-secondary text-center p-3"
                            scope="col"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {RecipesList.map((Recipe, index) => (
                          <tr key={Recipe?.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{Recipe?.name}</td>
                            <td>
                              <div className="img-container">
                                {Recipe.imagePath ? (
                                  <img
                                    className="img-fluid rounded-2"
                                    src={`${baseUrl}/` + Recipe.imagePath}
                                    alt="recipe-img"
                                  />
                                ) : (
                                  <img
                                    className="img-fluid"
                                    src={noData}
                                    alt="recipe-img"
                                  />
                                )}
                              </div>
                            </td>
                            <td>{Recipe?.price}</td>
                            <td>{Recipe?.description}</td>
                            <td>{Recipe?.category[0]?.name}</td>
                            <td>{Recipe?.tag?.name}</td>
                            <td className="text-center">
                              <FaEye
                                onClick={() => showViewModal(Recipe.id)}
                                className="text-success eye"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <nav
                    className="d-flex  justify-content-center"
                  >
                    <ul className="pagination  pagination-sm">
                      <li className={currentPg <= 1 ? "disabled  page-item":"page-item" }>
                        <a className="page-link pag" onClick={()=>previousPages()}>Previous</a>
                      </li>
                      {pagesArray.map((pageNo, index) => (
                        <li
                          key={index}
                          onClick={() =>changePage(pageNo, searchString)}
                          className={pageNo ==currentPg ? "active page-item":"page-item" }
                        >
                          <a className="page-link pag">{pageNo}</a>
                        </li>
                      ))}

                      <li className={currentPg >= pagesArray.length ? "disabled page-item":"page-item" }>
                        <a className="page-link " onClick={()=>nextPages()} >
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              ) : (
                <NoData />
              )}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
