import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = { isLoading: false, error: null };

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {},
});

export default slice.reducer;
