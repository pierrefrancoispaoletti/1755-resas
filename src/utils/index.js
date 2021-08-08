export const getFieldValue = (e, func, state) => {
  let newState = {};
  newState[e.target.name] = e.target.value;
  func({ ...state, ...newState });
};

export const calculateDate = (date) => {
  let dateDifference = new Date(date).getDate() - new Date().getDate();
  if (dateDifference === 0) {
    return [0, "Aujourd'hui"];
  }
  if (dateDifference === 1) {
    return [1, "Demain"];
  }
  if (dateDifference < 0) {
    return [-1, `Il y à ${Math.abs(dateDifference)} jours`];
  }
  if (dateDifference > 1) {
    return [2, `Dans ${dateDifference} jours`];
  }
};

export const bookingsFilter = (array, calculationFunction, mainFilter) => {
  return array.filter(
    (i) => calculationFunction(i.bookingDate)[0] === mainFilter
  );
};
