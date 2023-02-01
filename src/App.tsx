import { useEffect } from "react";

import { useAppDispatch } from "./redux/hooks";
import { setInitData } from "./redux/reducers/data";
import MenuAppBar from "./components/MenuAppBar";
import Router from "./components/Router";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setInitData(50));
  }, [dispatch]);

  return (
    <div className="App">
      <MenuAppBar />
      <Router />
    </div>
  );
}

export default App;
