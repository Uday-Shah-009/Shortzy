const tryCatch = (controllerFn) => {
  return async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default tryCatch;