const ShowAddGroupTabReducer = (state = false, action) => {
  switch (action.type) {
    case "showAddGroupTab":
      return action.payload;
    default:
      return state;
  }
};

export default ShowAddGroupTabReducer;
