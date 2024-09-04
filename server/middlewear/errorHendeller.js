function errorHandeler(err, req, res, next) {
  let status = 500 || err.status;
  let message = err.message || "Server internal error";

  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;
    // -----------------
    case "EmailIsRequired":
      status = 400;
      message = "Email is required";
      break;
    case "PasswordIsRequied":
      status = 400;
      message = "Password is required";
      break;
    case "InvalidEmailOrPassword":
      status = 401;
      message = "Password or email is invalid";
      break;
    case "not found":
      status = 404;
      message = "not found";
      break;
    case "Forbidden":
      status = 403;
      message = "Forbidden";
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandeler;
