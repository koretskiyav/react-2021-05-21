import { CurrencyConsumer } from '../../context/currency';

const TransformCurrency = ({ value = 0 }) => {
  const currencies = {
    US: `${value.toFixed(2)} $`,
    EU: `${(value * 0.83).toFixed(2)} €`,
    RU: `${(value * 72.11).toFixed(2)} ₽`,
    UA: `${(value * 27.0).toFixed(2)} ₴`,
  };

  const transformedValue = (currency) => currencies[currency];

  return (
    <CurrencyConsumer>
      {({ currency }) => {
        return transformedValue(currency);
      }}
    </CurrencyConsumer>
  );
};

export default TransformCurrency;
