import { createSlice } from "@reduxjs/toolkit";

import { Data } from "../../utils/types";
import { AppDispatch } from "../store";

const initialState: Data = {
  count: 0,
  entries: [],
};

const dataReducer = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData(state, action) {
      return action.payload;
    },
  },
});

export const setInitData = () => {
  return async (dispatch: AppDispatch) => {
    const res = await fetch("https://api.publicapis.org/entries");
    const data = await res.json();
    dispatch(setData(data));
  };
};

export const { setData } = dataReducer.actions;
export default dataReducer.reducer;
