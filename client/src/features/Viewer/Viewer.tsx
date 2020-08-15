import React, { useEffect } from "react";
import styles from "./Viewer.module.css";
import { getData, getError, getStatus } from "../Meta/MetaSlice";

import { useSelector } from "react-redux";

export const Viewer = ({}) => {
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const data = useSelector(getData);

  if (status === "error") {
    return <div className={styles.error}> something went wrong sorry </div>;
  }
  if (status === "loading") {
    return <div className={styles.loader} />;
  }
  if (status === "ready") {
    return <div className={styles.view}>{JSON.stringify(data, null, 2)}</div>;
  }

  return <div> Welcome </div>;
};
