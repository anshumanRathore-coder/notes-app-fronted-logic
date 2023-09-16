import { useState } from "react";

import userContext from "./userContext";

export default function UserInfo(props) {
  
  const updateState = (newState) => {
    const s = { ...userState };
    for (const key in newState) {
      s[key] = newState[key];
    }
    setState(s);
  };

  const state = {
    isLogin: false,
    noteCount: 0,
  };

  const [userState, setState] = useState(state);

  return (
    <userContext.Provider value={{ userState, updateState }}>
      {props.children}
    </userContext.Provider>
  );
}
