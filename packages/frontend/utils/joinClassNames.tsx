export default function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
