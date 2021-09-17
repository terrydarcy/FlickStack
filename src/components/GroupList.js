import React, { useEffect, useState, useContext } from "react";
import styles from "./styles/GroupList.module.css";
import firebase from "firebase";
import { UserContext } from "../providers/UserProvider";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      firebase
        .firestore()
        .collection("groups")
        .where("members", "array-contains", user.uid)
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot.docs.map((doc) => ({ id: doc.id, group: doc.data() })));
          setGroups(snapshot.docs.map((doc) => ({ id: doc.id, group: doc.data() })));
        });
    }
  }, [user]);

  return (
    <div className={styles.groups_list}>
      {groups.map(({ id, group }) => (
        <div key={id} className={styles.group_item}>
          <img className={styles.rounded_profile_group} src={group.photoURL} alt ="profile" />
          <h3 style={{ margin: 0 }}>{group.groupName}</h3>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
