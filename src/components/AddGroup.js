import React, { useContext, useState, useEffect } from "react";
import styles from "./styles/AddGroup.module.css";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import { UserContext } from "../providers/UserProvider";
import { useDispatch } from "react-redux";
import { setShowAddGroupTab } from "../redux/actions";
import { useSelector } from "react-redux";

function AddGroup() {
  const [groupName, setGroupName] = useState("");
  const [groupKeywords, setGroupKeywords] = useState([]);
  const user = useContext(UserContext);
  const showAddGroupTab = useSelector((state) => state.showAddGroupTab);
  const dispatch = useDispatch();

  const [uid, setUid] = useState();
  const [photoURL_, setPhotoURL] = useState();

  useEffect(() => {
    if (user) {
      setUid(user.uid);
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const sanitizeKeywords = (unstanitezedKeywords) => {
    var result = [];
    var string = unstanitezedKeywords;
    result = string.split(/[ ,]+/);
    return result.toString();
  };

  const addGroup = () => {
    var sanitizedKeywords = sanitizeKeywords(groupKeywords);
    console.log(sanitizedKeywords);
    if (groupName.length > 0) {
      firebase
        .firestore()
        .collection("groups")
        .add({
          groupName: capitalizeFirstLetter(groupName),
          keywords: sanitizedKeywords,
          members: [uid],
          photoURL: [photoURL_],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      dispatch(setShowAddGroupTab(!showAddGroupTab));
      setGroupName("");
      setGroupKeywords([]);
    }
  };

  return (
    <div className={styles.add_group_container}>
      <h2 className={styles.add_group_title}>New Group</h2>
      <input
        className={styles.add_group_input}
        placeholder="Group name"
        onChange={(e) => setGroupName(e.target.value)}
      />
      <textarea
        className={styles.add_group_input}
        rows="5"
        cols="50"
        placeholder="Movie keywords"
        onChange={(e) => setGroupKeywords(e.target.value)}
      />
      <p className={styles.keyword_text}>
        Seperate keywords with commas or spaces
      </p>
      <Button
        title="Create New Group"
        className={styles.add_group_button}
        onClick={() => addGroup()}
      >
        <p className={styles.add_group_button_text}>create group</p>
      </Button>
    </div>
  );
}

export default AddGroup;
