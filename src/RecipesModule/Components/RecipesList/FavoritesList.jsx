import React, { useContext, useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import noData from "../../../assets/images/nodata.png";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from "react-bootstrap/Modal";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import NoData from "../../../SharedModule/Components/NoData/NoData";


export default function FavoritesList() {
  const [favList, setFavList] = useState([]);
  let { headers, baseUrl } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [modalState, setModalState] = useState("close");
  const [pagesArray, setPagesArray] = useState([]);


  const handleClose = () => setModalState("close");

  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("delete-modal");
  };

  //--------------------getAllFavorites---------------------
  const getAllFavorites = (pageNo) => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/api/v1/userRecipe/`, { headers,
        params: {
          pageSize:20,
        },
      })
      .then((response) => {
        console.log(response);
        setFavList(response?.data?.data); 
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Axios Error!!!");
        setIsLoading(false);
      });
  };
  //--------------------deleteFavoriteRecipe---------------------
  const deleteFavoriteRecipe = () => {
    setIsLoading(true);
    axios
      .delete(`${baseUrl}/api/v1/userRecipe/${itemId}`, { headers })
      .then((response) => {
        console.log(response.data.data);
        toast.success("Recipe removed from favourite successfully");
        setIsLoading(false);
        handleClose();
        getAllFavorites();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Axios Error!!!");
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getAllFavorites();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Favorite List</title>
      </Helmet>
      <Header
        prefix={"Favorites"}
        title={"Items"}
        paragraph={`You can now add your items that any user can order it from the Application and you can edit`}
      />
      <Modal show={modalState == "delete-modal"} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
            <img className="w-50" src={noData} alt="avatar" />
            <h4 className="my-3">Remove From Favourite List ?</h4>
            <span className="text-muted">
              are you sure you want to remove this recipe ? if you are sure just
              click on remove this recipe
            </span>
            <hr />
            <div className="form-group my-3 text-end">
              <button
                onClick={deleteFavoriteRecipe}
                className={
                  "btn btn-outline-danger" + (isLoading ? " disabled" : "")
                }
              >
                {isLoading == true ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Remove this recipe"
                )}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="row   px-4">
        {!isLoading ? (
          <>
            {favList.length > 0 ? (
              <div className="row">
                {favList.map((fav) => (
                  <div key={fav.id} className="col-md-4">
                    <div>
                     <div className="text-center   shadow rounded-3 p-3 my-2">
                     {fav?.recipe?.imagePath ? (
                            <img
                              className="w-50 img-height  rounded-2"
                              src={`${baseUrl}/` + fav?.recipe?.imagePath}
                              alt="recipe-img"
                            />
                          ) : (
                            <img
                              className="w-50 img-height rounded-2"
                              src={noData}
                              alt="recipe-img"
                            />
                          )}
                          <h3 className="text-muted">{fav?.recipe?.name}</h3>
                          <p className="text-muted">{fav?.recipe?.description}</p>
                          <FaRegTrashCan
                              onClick={() => showDeleteModal(fav.id)}
                              className="text-danger   del"
                            />
                     </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NoData />
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
