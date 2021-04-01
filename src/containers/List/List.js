import React, { useEffect, useState } from "react";
import axios from "../../axios-planner";

import DeleteItem from "../../components/DeleteItem/DeleteItem";
import Modal from "../../components/UI/Modal/Modal";
import NewItem from "../NewItem/NewItem";
import ListItem from "../../components/ListItem/ListItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/FormElements/Button";
import "./List.css";

const List = (props) => {
  const [isDeleting, setIsDeleting] = useState([false, null]); // show modal, itemId
  const [list, setList] = useState([]);
  const [editingItem, setEditingItem] = useState([false, null]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState({});

  useEffect(() => {
    console.log(editingItem);
  }, [editingItem]);

  useEffect(() => {
    axios
      .get("/planner")
      .then((result) => {
        setList(result.data);
        const initIsExpanded = {};
        Object.keys(result.data).map((key) => (initIsExpanded[key] = false));
        setIsExpanded(initIsExpanded);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onPostHandler = (newItem) => {
    const updatedList = [...list, newItem];
    setList(updatedList);
    setEditingItem(false);
  };

  const onDeleteHandler = () => {
    axios
      .post("/delete-item", { id: isDeleting[1] })
      .then((result) => {
        const updatedList = list.filter((item) => {
          console.log(item._id, !(item._id === isDeleting[1]));
          return !(item._id === isDeleting[1]);
        });
        console.log(updatedList);
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
                  onEdit={() => setEditingItem([true, item._id])}
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
          <Button onClick={() => setEditingItem([true, null])}>ADD ITEM</Button>
        </div>
        <Modal
          scroll
          show={editingItem[0]}
          modalClosed={() => setEditingItem([false, null])}
        >
          <NewItem
            setIsLoading={setIsLoading}
            onPostHandler={onPostHandler}
            itemData={
              editingItem[0] && list.find((item) => item._id === editingItem[1])
            }
            closeModal={() => setEditingItem([false, null])}
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
