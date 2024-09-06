import { fraction } from 'mathjs';

export const decimalToFraction = function (decimal) {
  if (decimal == null) return;
  const frac = fraction(decimal);
  if (Number.isInteger(frac.n / frac.d)) return decimal;
  return `${frac.n}/${frac.d}`; // Converts the Fraction object to a string
};

export const roundToNearestQuarter = function (number) {
    if (number %  0.25 ===  0) {
      return number;
    } else {
      return Math.round(number *  4) /  4;
    }
  };
  

export const calculateIngredients = function (servings, quantity, newServings) {
  let requiredIngredients = (servings / newServings) * quantity;
  return requiredIngredients;
};
