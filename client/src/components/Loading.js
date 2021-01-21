import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function Loading({ loading, ...rest }) {

  // Loading is a prop passed in. An example of a use case is: while a database or user is loading, then loading will be set to true.
  // once loading is set to false, it will return the Route.
  // for example, if {...rest} is Home.js, then the Home.js will be returned once loading is set to false.
  return loading ? (<h1>LOADING</h1>) : (<Route {...rest} />);
}