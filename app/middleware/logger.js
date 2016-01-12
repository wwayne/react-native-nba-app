export default function logger (store) {
  return next => action => {
    /* You have to comment these or you will get error when running in real device */
    // console.group()
    // console.log('will dispath', action)
    const result = next(action)
    // console.log('state after dispatch', store.getState())
    // console.groupEnd()
    return result
  }
}
