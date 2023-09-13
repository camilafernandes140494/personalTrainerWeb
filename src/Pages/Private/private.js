import React, { useContext } from 'react';
import { AuthContext } from '../../Service/Connection/AuthContext';
const Private = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user.uid === 'Hq8K00ZJiKfOB987RamVa31XYTq1') {
    return <div>{children}</div>;
  } else {
    return null;
  }
};

export default Private;
