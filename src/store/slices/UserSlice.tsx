import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [{ name: "ansari" }],
  },
  reducers: {
    addUser(state, action) {
      state.users = action.payload;
    },
    removeUser: (state, action) => {},
    deleteUsers: (state, action) => {},
  },
});

export const { addUser, removeUser, deleteUsers } = userSlice.actions;
export default userSlice.reducer;
