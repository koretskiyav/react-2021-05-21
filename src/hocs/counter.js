import useAmount from '../hooks/use-amount';

export default (WrappedComponent) => (props) => {
  const amountDerivedTest = props.hasOwnProperty('amount') ? props.amount : 0;
  const amountProps = useAmount(amountDerivedTest);

  return <WrappedComponent {...props} {...amountProps} />;
};
