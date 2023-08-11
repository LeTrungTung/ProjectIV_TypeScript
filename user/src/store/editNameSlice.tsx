import { createSlice } from "@reduxjs/toolkit";

const editNameSlice = createSlice({
  name: "editName",
  initialState: true,
  reducers: {
    updateName: (state) => {
      return (state = !state);
    },
  },
});
export const { updateName } = editNameSlice.actions;
export default editNameSlice.reducer;
