import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../pages/Home";
import Grouping from "../../pages/Grouping";
import Filtering from '../../pages/Filtering';
import Sorting from "../../pages/Sorting";
import Subline from "../../pages/Subline";
import Editing from "../../pages/Editing";
import Combination from "../../pages/Combination";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/grouping/" element={<Grouping />} />
    <Route path="/filtering/" element={<Filtering />} />
    <Route path="/sorting/" element={<Sorting />} />
    <Route path="/subline/" element={<Subline />} />
    <Route path="/editing/" element={<Editing />} />
    <Route path="/combination/" element={<Combination />} />
  </Routes>
);

export default Router;
