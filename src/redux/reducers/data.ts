import { createSlice } from "@reduxjs/toolkit";
import { generateRandomArray } from "../../utils/helpers";

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

export const setInitData = (numberOfRows: number) => {
  return async (dispatch: AppDispatch) => {
    const res = await fetch("https://api.publicapis.org/entries");
    const data = await res.json();
    const selectedData = generateRandomArray(
      data.entries,
      numberOfRows > data.count
        ? data.count
        : numberOfRows < 0
        ? 0
        : numberOfRows
    );
    dispatch(
      setData({
        count: selectedData.length,
        entries: selectedData,
      })
    );
  };
};

export const { setData } = dataReducer.actions;
export default dataReducer.reducer;
