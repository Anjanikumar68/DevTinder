import validator from "validator";

//validate signup
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not Valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a valid password!");
  }
};

//Update a Login api
const validateLoginData = (req) => {

  const { emailId, password } = req.body;

  if (!emailId) {
    throw new Error("Email is required");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email");
  }

  if (!password) {
    throw new Error("Password is required");
  }
};

// validate Update a user api
const validateEditProfileData = (req) => {
  const data = req.body;

  //check allowed fields
  const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

  const isUpdateAllowed = Object.keys(data).every((k) => {
    return ALLOWED_UPDATES.includes(k);
  });

  if (!isUpdateAllowed) {
    throw new Error("Update not allowed");
  }

  // Validate photo URL
  if (data.photoUrl && !validator.isURL(data.photoUrl)) {
    throw new Error("Invalid photo URL");
  }

  //validate about
  if (data.about && !validator.data.about.length > 200) {
    throw new Error("About cannot exceed 200 characters");
  }

  //validate gender
  const allowedGender = ["male", "female", "other"];

  if (data.gender && !allowedGender.includes(data.gender)) {
    throw new Error("Invalid gender");
  }

  //validate age
  if (data.age && (data.age > 18 || data.age < 80)) {
    throw new Error("Age should be between 18 and 80");
  }

  //validate skill
  if (data?.skills.length > 10) {
    throw new Error("String cannot be more then 10");
  }
};



export { validateSignUpData, validateEditProfileData, validateLoginData };
