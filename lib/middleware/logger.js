export default function logger (store) {
  return next => action => {
    // console.group()
    // console.log('will dispath', action)
    const result = next(action)
    // console.log('state after dispatch', store.getState())
    // console.groupEnd()

    return result
  }
}