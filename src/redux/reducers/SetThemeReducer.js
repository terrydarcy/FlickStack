const SetThemeReducer = (state = "dark", action) => {
  switch (action.type) {
    case "setTheme":
      return action.payload;
    default:
      return state;
  }
};

export default SetThemeReducer;
