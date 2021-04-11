const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const validate = (value, validators, action) => {
  let isValid = true;
  let array = [...value];
  console.log("validating: ", value);
  console.log("validators: ", validators);
  action && console.log(action);

  switch (action) {
    case "FLAT":
      let prev_length = 1;
      let curr_length = array.length;
      while (curr_length > prev_length) {
        array = array.flat();
        prev_length = curr_length;
        curr_length = array.length;
      }
      break;
    default:
      break;
  }

  if (Array.isArray(value)) {
    for (const item of array) {
      for (const validator of validators) {
        if (validator.type === VALIDATOR_TYPE_REQUIRE) {
          isValid = isValid && item.trim().length > 0;
        }
        if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
          isValid = isValid && item.trim().length >= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
          isValid = isValid && item.trim().length <= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_MIN) {
          isValid = isValid && +item >= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_MAX) {
          isValid = isValid && +item <= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_EMAIL) {
          isValid = isValid && /^\S+@\S+\.\S+$/.test(item);
        }
      }
    }
  } else if (typeof value === "string") {
    for (const validator of validators) {
      if (validator.type === VALIDATOR_TYPE_REQUIRE) {
        isValid = isValid && value.trim().length > 0;
      }
      if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
        isValid = isValid && value.trim().length >= validator.val;
      }
      if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
        isValid = isValid && value.trim().length <= validator.val;
      }
      if (validator.type === VALIDATOR_TYPE_MIN) {
        isValid = isValid && +value >= validator.val;
      }
      if (validator.type === VALIDATOR_TYPE_MAX) {
        isValid = isValid && +value <= validator.val;
      }
      if (validator.type === VALIDATOR_TYPE_EMAIL) {
        isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
      }
    }
  }

  return isValid;
};
