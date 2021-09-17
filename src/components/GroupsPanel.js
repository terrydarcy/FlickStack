import React from "react";
import styles from "./styles/GroupsPanel.module.css";
import { ColoredLine } from "../components/ColoredLine";
import IconButton from "@material-ui/core/IconButton";
import AddGroup from "./AddGroup";
import { useDispatch } from "react-redux";
import { setShowAddGroupTab } from "../redux/actions";
import { useSelector } from "react-redux";
import GroupList from "./GroupList";

function GroupsPanel() {
  const dispatch = useDispatch();
  const showAddGroupTab = useSelector((state) => state.showAddGroupTab);

  const toggleAddGroupTab = () => {
    dispatch(setShowAddGroupTab(!showAddGroupTab));
  };

  return (
    <div className={styles.groups_container}>
      <div className={styles.groups_title_row}>
        <h2 className={styles.groups_title}>Groups</h2>
        <div className={styles.groups_buttons}>
          <IconButton
            title="Create a new group"
            size={"medium"}
            className={styles.plus_button}
            onClick={() => toggleAddGroupTab()}
          >
            <i className="fas fa-plus" ></i>
          </IconButton>
        </div>
      </div>
      <ColoredLine />
      {showAddGroupTab ? <AddGroup /> : <div> </div>}
      <GroupList />
    </div>
  );
}

export default GroupsPanel;
