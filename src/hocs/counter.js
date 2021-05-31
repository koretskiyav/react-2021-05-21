import useAmount from '../hooks/use-amount';

export default (WrappedComponent) => (props) => {
  const { initCounter = 0 } = props;
  const amountProps = useAmount(initCounter);
  return <WrappedComponent {...props} {...amountProps} />;
};
