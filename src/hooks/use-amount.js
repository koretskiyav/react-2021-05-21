import { useState, useMemo } from 'react';

export default function useAmount(initialAmount) {
  const [amount, setAmount] = useState(initialAmount);

  /// Минус конечно в том что устанавливается состояние а потом идет перезапись хуком
  useMemo(() => {
    setAmount(initialAmount);
  }, [initialAmount]);

  const decrement = () => setAmount(amount > 0 ? amount - 1 : 0);
  const increment = () => setAmount(amount + 1);

  return { amount, decrement, increment };
}
