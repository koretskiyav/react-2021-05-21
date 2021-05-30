import useAmount from '../hooks/use-amount';

export default (WrappedComponent) => ({startValue = 0, ...props}) => {
  const amountProps = useAmount(startValue);
  return <WrappedComponent {...props} {...amountProps} />;
};
