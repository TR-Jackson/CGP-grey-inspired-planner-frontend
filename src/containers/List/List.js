import React, { useEffect, useState } from "react";
import axios from "../../axios-planner";

import Modal from "../../components/UI/Modal/Modal";
import NewItem from "../NewItem/NewItem";
import ListItem from "../../components/ListItem/ListItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/FormElements/Button";
import "./List.css";

const List = (props) => {
  const [list, setList] = useState([]);
  const [editingItem, setEditingItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState({});

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
    newItem._id = Math.random().toString(16).slice(-4);
    const updatedList = [...list, newItem];
    setList(updatedList);
    setEditingItem(false);
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
          <Button onClick={() => setEditingItem(true)}>ADD ITEM</Button>
        </div>
        <Modal show={editingItem} modalClosed={() => setEditingItem(false)}>
          <NewItem
            setIsLoading={setIsLoading}
            onPostHandler={onPostHandler}
            closeModal={() => setEditingItem(false)}
          />
        </Modal>
      </div>
    );
  }

  return <>{content}</>;
};

export default List;
