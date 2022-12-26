const treatErrors = (err) => {
  const { errors } = err;
  const [{ message }] = errors;
  const [ValidationErrorItem] = errors;
  const { validatorKey } = ValidationErrorItem;

  const errorsType = {
    not_unique: message,
    notEmpty: message,
    len: message,
    isEmail: message,
    isInt: message,
    isLetter: message,
    max: message,
    min: message,
  };
  return {
    error:
      [errorsType[validatorKey]] ||
      "Erro não encontrado em nossa base de dados.",
  };
};

const createError = (message) => ({ error: [message] });

export { treatErrors, createError };
