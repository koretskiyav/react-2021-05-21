export default function useCurrency(currency) {
  return (priceValue) => priceValue + currency;
}
