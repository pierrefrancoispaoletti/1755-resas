// utilisé pour la gestion des champs des formulaires
import jwt_decode from "jwt-decode";
import { tokenName } from "../_const";

export const getFieldValue = (e, func, state) => {
  let newState = {};
  newState[e.target.name] = e.target.value;
  func({ ...state, ...newState });
};

// calcule la difference entre 2 dates et retourne un tableau qui renvois une valeur et une chaine de caractéres
export const calculateDate = (date) => {
  const oneDay = 24 * 60 * 60 * 1000;

  const dateDifference = Math.round((new Date(date) - new Date()) / oneDay) + 1;

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

//filtre un tableau avec un filtre et une fonction et qui retourne un tableau filtré des elements

export const bookingsFilter = (array, calculationFunction, mainFilter) => {
  return array.filter(
    (i) => calculationFunction(i.bookingDate)[0] === mainFilter
  );
};

//reconnection auto si token valide dans le temps
export const reconnector = (token, logUserFunction) => {
  if (!token) {
    return false;
  } else {
    let decodedToken = jwt_decode(token);
    const { user, exp } = decodedToken;
    const { role } = user;
    if (Date.now() > exp * 1000) {
      return false;
    } else {
      logUserFunction(role);
      return true;
    }
  }
};

export const logout = (setUser, setMessage) => {
  localStorage.removeItem(`token-${tokenName}`);
  setUser("");
  setMessage({
    success: true,
    message: "Déconnexion réussie",
  });
};
