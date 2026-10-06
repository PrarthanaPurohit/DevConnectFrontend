// Same rules as the backend's validator.isStrongPassword() defaults, so the
// form only accepts passwords the server will accept too.
const SYMBOL = /[-#!$@£%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_RULES = [
  { label: "At least 8 characters", need: "at least 8 characters", test: (p) => p.length >= 8 },
  { label: "1 uppercase letter (A-Z)", need: "1 uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "1 lowercase letter (a-z)", need: "1 lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "1 number (0-9)", need: "1 number", test: (p) => /[0-9]/.test(p) },
  { label: "1 symbol (e.g. ! @ # $ %)", need: "1 symbol", test: (p) => SYMBOL.test(p) },
];

// ["a", "b", "c"] -> "a, b and c"
const joinList = (items) =>
  items.length > 1 ? items.slice(0, -1).join(", ") + " and " + items.at(-1) : items[0];

export const validateLogin = ({ emailId, password }) => {
  if (!emailId || !password) return "Please enter your email and password.";
  if (!EMAIL.test(emailId)) return "Please enter a valid email address.";
  return "";
};

export const validateSignUp = ({ firstName, lastName, emailId, password }) => {
  if (!firstName || !lastName || !emailId || !password) return "Please fill in all the fields.";
  if (firstName.length < 2) return "First name must be at least 2 characters.";
  if (firstName.length > 50) return "First name can't be longer than 50 characters.";
  if (!EMAIL.test(emailId)) return "Please enter a valid email address.";

  const missing = PASSWORD_RULES.filter((rule) => !rule.test(password)).map((rule) => rule.need);
  if (missing.length) return `Your password needs ${joinList(missing)}.`;
  return "";
};

// Turns the backend's raw error text (e.g. "Error logging in: Invalid password or emailId",
// or a MongoDB "E11000 duplicate key" error) into a message fit to show the user.
export const getAuthErrorMessage = (err, isLogin) => {
  if (!err.response) return "Can't reach the server. Check your internet connection and try again.";

  const { status, data } = err.response;
  const raw = (typeof data === "string" ? data : data?.message || "").toLowerCase();

  if (isLogin) {
    if (status === 401) return "Incorrect email or password.";
  } else {
    if (raw.includes("e11000") || raw.includes("duplicate")) {
      return "An account with this email already exists. Please log in instead.";
    }
    if (raw.includes("strong password")) return "Your password isn't strong enough. Check the list below the password field.";
    if (raw.includes("email")) return "Please enter a valid email address.";
    if (raw.includes("firstname")) return "First name must be between 2 and 50 characters.";
    if (raw.includes("all fields")) return "Please fill in all the fields.";
  }

  if (status >= 500) return "Something went wrong on our side. Please try again in a moment.";
  return "Something went wrong. Please try again.";
};
