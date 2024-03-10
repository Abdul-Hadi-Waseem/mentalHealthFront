import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [{ name: "ansari" }],
    currentUserInformation: {},
    patient:{current_doctor_details: {}},
    doctor:{},
    pscOrScreen: "PSC"
  },
  reducers: {
    setUserInformation(state, action) {
      state.currentUserInformation = action.payload;
    },
    setcurrent_doctor_details(state, action) {
      state.patient.current_doctor_details = action.payload;
    },
    setPscOrScreen(state,action){
      state.pscOrScreen = action.payload;
    },
    addUser(state, action) {
      state.users = action.payload;
    },
    removeUser: (state, action) => {},
    deleteUsers: (state, action) => {},
  },
});

export const { setUserInformation,setcurrent_doctor_details,setPscOrScreen, addUser, removeUser, deleteUsers } =
  userSlice.actions;
export default userSlice.reducer;
