export default function addDashes(input) {
  const withDashes = input
    .trim()
    .split(' ')
    .join('-');
  return withDashes;
}
