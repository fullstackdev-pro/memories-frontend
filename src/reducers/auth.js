export default (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.clear("profile");
      localStorage.setItem("profile", action.payload.profile);
      localStorage.setItem("token", action.payload.token);

      return { ...state, authData: action.payload };
    case "LOGOUT":
      localStorage.clear("profile");

      return { ...state, authData: null };
    default:
      return state;
  }
};
