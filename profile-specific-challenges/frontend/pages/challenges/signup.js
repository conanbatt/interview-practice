import { useState } from "react";

function API(data) {
  return new Promise((res) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        res({
          success: "Your Account has been successfully created!",
        });
      } else {
        res({ error: "Username is taken" });
      }
    }, 1000);
  });
}

const validateEmail = (email) => {
  if (!email.match(/^[^@]+@[^@]+\.[^@]+$/))
    return ["Email is not a valid email address"];
  return [];
};

const validatePassword = (password) => {
  const errors = [];
  if (!password.match(/\d/))
    errors.push("The password must contain at least one digit");
  if (!password.match(/\W/))
    errors.push("The password must contain at least one special letter"); // This doesn't includes underscores
  if (password.length < 8)
    errors.push("The password must be at least 8 characters");
  return errors;
};

const submitSignupForm = async ({ email, password }) => {
  const errors = [...validateEmail(email), ...validatePassword(password)];

  if (errors.length > 0) {
    return {
      data: null,
      errors,
    };
  }

  const request = await API({ email, password });

  if (request.error) {
    return {
      data: null,
      errors: [request.error],
    };
  }

  return {
    data: request.success,
    errors: null,
  };
};

export default function SignupForm() {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    setLoading(true);
    const { data, errors } = await submitSignupForm(formState);

    setLoading(false);

    if (errors) {
      setErrors(errors);
      return;
    }

    alert(data);
  };

  return (
    <>
      <h1>Signup Form</h1>
      <form onSubmit={handleSubmit}>
        {errors && (
          <div>
            <ul>
              {errors.map((error, i) => (
                <li key={`error-${i}`}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formState.email ?? ""}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="email">Password:</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formState.password ?? ""}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <button disabled={loading} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
