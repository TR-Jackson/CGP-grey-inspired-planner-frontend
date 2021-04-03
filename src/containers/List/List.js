import React, { useEffect, useState } from "react";
import axios from "../../axios-planner";

import DeleteItem from "../../components/DeleteItem/DeleteItem";
import Modal from "../../components/UI/Modal/Modal";
import UpdateItem from "../UpdateItem/UpdateItem";
import ListItem from "../../components/ListItem/ListItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/FormElements/Button";
import "./List.css";

const List = (props) => {
  const [isDeleting, setIsDeleting] = useState([false, null]); // show modal, itemId
  const [list, setList] = useState([]);
  const [isEditingItem, setIsEditingItem] = useState([false, null]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState({});

  useEffect(() => {
    // axios
    //   .get("/planner")
    //   .then((result) => {
    //     setList(result.data);
    //     const initIsExpanded = {};
    //     Object.keys(result.data).map((key) => (initIsExpanded[key] = false));
    //     setIsExpanded(initIsExpanded);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setList([
      {
        title: "Steps Test",
        steps: [
          [
            [
              "step1000000000000000000000000",
              [
                ["step1", [["step1", null]]],
                ["step1", [["step1", null]]],
              ],
            ],
          ],
          [["step2", null]],
        ],
        due: [2021, 3, 25],
      },
    ]);
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
        console.log(newItem);
        updatedList[
          updatedList.findIndex((item) => item._id === newItem._id)
        ] = newItem;
        console.log(updatedList);
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
      <div className="list">
        <ul>
          {list.length > 0 ? (
            list.map((item) => {
              return (
                <ListItem
                  key={item._id}
                  day={item.due[2]}
                  month={item.due[1]}
                  year={item.due[0]}
                  steps={item.steps}
                  title={item.title}
                  onToggle={() => onToggleHandler(list.indexOf(item))}
                  expanded={isExpanded[list.indexOf(item)]}
                  onDelete={() => setIsDeleting([true, item._id])}
                  onEdit={() => setIsEditingItem([true, item._id])}
                />
              );
            })
          ) : (
            <p className="centred">
              <strong>No Plans Yet!</strong>
            </p>
          )}
        </ul>
        <div className="centred">
          <Button onClick={() => setIsEditingItem([true, null])}>
            ADD ITEM
          </Button>
        </div>
        <Modal
          scroll
          show={isEditingItem[0]}
          modalClosed={() => setIsEditingItem([false, null])}
        >
          <UpdateItem
            setIsLoading={setIsLoading}
            onPostHandler={onPostHandler}
            itemData={
              isEditingItem[0] &&
              list.find((item) => item._id === isEditingItem[1])
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
      </div>
    );
  }

  return <>{content}</>;
};

export default List;
