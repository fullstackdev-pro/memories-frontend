export default (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.clear("memories_profile");
      localStorage.clear("memories_token");
      localStorage.setItem("memories_profile", action.payload.profile);
      localStorage.setItem("memories_token", action.payload.token);

      return { ...state, authData: action.payload };
    case "LOGOUT":
      localStorage.clear("memories_profile");
      localStorage.clear("memories_token");

      return { ...state, authData: null };
    default:
      return state;
  }
};
