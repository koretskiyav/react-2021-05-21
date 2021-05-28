export default function Rate(props) {
  let list = Array(5)
    .fill()
    .map((_, key) => {
      return props.value - key > 0 ? '★' : '☆';
    });
  return <div>{list}</div>;
}
