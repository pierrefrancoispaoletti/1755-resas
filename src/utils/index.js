export const getFieldValue = (e, func, state) => {
  let newState = {};
  newState[e.target.name] = e.target.value;
  func({ ...state, ...newState });
};

export const calculateDate = (date) => {
  let dateDifference = new Date(date).getDate() - new Date().getDate();
  if (dateDifference === 0) {
    return "Aujourd'hui, Le";
  }
  if (dateDifference === 1) {
    return "Demain, Le ";
  }
  if (dateDifference < 0) {
    return -1;
  }
  if (dateDifference > 1) {
    return `Dans ${dateDifference} jours, Le`;
  }
};
