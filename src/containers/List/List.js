import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios-planner";

import DeleteItem from "../../components/DeleteItem/DeleteItem";
import Modal from "../../components/UI/Modal/Modal";
import UpdateItem from "../UpdateItem/UpdateItem";
import ListItem from "../../components/ListItem/ListItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/FormElements/Button/Button";

const List = (props) => {
  const [isDeleting, setIsDeleting] = useState([false, null]); // show modal, itemId
  const [list, setList] = useState([]);
  const [isEditingItem, setIsEditingItem] = useState([false, null]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState([]);
  const isLoggedIn = useState(
    !!document.cookie.match(/^(.*;)?\s*token\s*=\s*[^;]+(.*)?$/)
  )[0];

  useEffect(() => {
    axios
      .get("/planner")
      .then((result) => {
        console.log("fetched");
        setList(result.data);
        const initIsExpanded = {};
        Object.keys(result.data).map((key) => (initIsExpanded[key] = false));
        setIsExpanded(initIsExpanded);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // setList([
    //   {
    //     title: "Steps Test",
    //     _id: "65abc728",
    //     steps: [
    //       ["step1", [["step1sub1", []]]],
    //       ["step2", []],
    //     ],
    //     due: [2021, 3, 25],
    //   },
    // ]);
    setIsExpanded([false]);
    setIsLoading(false);
  }, []);

  const onPostHandler = (type, newItem) => {
    const updatedList = [...list];
    switch (type) {
      case "NEW":
        updatedList.push(newItem);
        setList(updatedList);
        break;
      case "UPDATE":
        updatedList[updatedList.findIndex((item) => item._id === newItem._id)] =
          newItem;
        setList(updatedList);
        break;
      default:
        break;
    }
  };

  const onDeleteHandler = () => {
    axios
      .post("/delete-item", { id: isDeleting[1] })
      .then((result) => {
        const updatedList = list.filter((item) => {
          return !(item._id === isDeleting[1]);
        });
        setList(updatedList);
        setIsDeleting([false, null]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onToggleHandler = (index) => {
    setIsExpanded({
      ...isExpanded,
      [index]: !isExpanded[index],
    });
  };

  let content = <Spinner />;

  if (!isLoading) {
    content = (
      <div className="h-screen hexagons">
        <div className="bg-gray-100 shadow-2xl w-4/5 m-auto h-screen flex flex-col space-y-6 py-10">
          {list.length > 0 ? (
            list.map((item) => {
              const date = new Date(item.due);
              return (
                <ListItem
                  key={item._id}
                  day={date.getDate()}
                  month={date.getMonth()}
                  year={date.getFullYear()}
                  steps={item.steps}
                  title={item.title}
                  onToggle={() => onToggleHandler(list.indexOf(item))}
                  expanded={isExpanded[list.indexOf(item)]}
                  onDelete={() => setIsDeleting([true, item._id])}
                  onEdit={() => setIsEditingItem([true, item._id])}
                />
              );
            })
          ) : isLoggedIn ? (
            <p className="text-center mt-5 font-bold">No Plans Yet!</p>
          ) : (
            <p className="text-center mt-5 font-bold">Please log in</p>
          )}
          {isLoggedIn ? (
            <>
              <Button
                className="text-white"
                centered
                width={10}
                onClick={() => setIsEditingItem([true, null])}
              >
                ADD ITEM
              </Button>
              <Modal
                scroll
                show={isEditingItem[0]}
                modalClosed={() => setIsEditingItem([false, null])}
              >
                <UpdateItem
                  setIsLoading={setIsLoading}
                  onPostHandler={onPostHandler}
                  itemData={
                    isEditingItem[0]
                      ? list.find((item) => item._id === isEditingItem[1])
                      : null
                  }
                  closeModal={() => setIsEditingItem([false, null])}
                  modalIsOpen={isEditingItem[0]}
                />
              </Modal>
              <Modal
                show={isDeleting[0]}
                modalClosed={() => setIsDeleting([false, null])}
              >
                <DeleteItem onClick={onDeleteHandler} />
              </Modal>
            </>
          ) : (
            <Link
              className="m-auto p-2 px-5 text-gray-100 bg-blue-400 rounded-md hover:bg-blue-300"
              to="/login"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default List;
