function throwIfError(rapydResObj) {
  if (rapydResObj.status.status === 'ERROR') {
    throw new Error(rapydResObj.status.message);
  }
}

export default throwIfError;
