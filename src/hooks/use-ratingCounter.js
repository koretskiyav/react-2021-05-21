/*
initialArray: any[] - массив, в котором ищем рейтинг
field: String - поле по которому считаем средний рейтинг
*/

export default function useRatingCounter(initialArray, field) {
  const middleRating = Math.round(initialArray.reduce((sum, value) => sum + value[field], 0) / initialArray.length);
  return { middleRating }
}