export default function NewlineText(props) {
  const text = props.text;
  return text.split("\n").map((str, i) => <p key={i}>{str}</p>);
}
