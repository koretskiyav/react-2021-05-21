export default function clump(value, lower,upper){
  return Math.max(lower, Math.min(value, upper));
}