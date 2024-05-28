import { useState } from "react";
import styles from "./signup.module.css";

{
  /* <h1>Signup Form</h1>
<p>
  Build a user Signup form in React with the following features.
  <ol>
    <li>An email and a password input</li>
    <li>Email must have an “@” and the domain side must include a “.”</li>
    <li>
      Password must include
      <ol>
        <li>At least one special character</li>
        <li>one number and be at least 8 characters</li>
      </ol>
    </li>
    <li>
      Validation and error handling
      <ol>
        <li>Client-side validations</li>
        <li>Server side errors</li>
      </ol>
    </li>
    <li>Basic aesthetics with pure CSS</li>
  </ol>
</p> */
}

const SPECIAL_CHAR = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

const FIELDS = [
  {
    id: "email",
    label: "Email",
    type: "text",
    validator: (email) => {
      const errors = [];

      if (!email.includes("@")) {
        errors.push('Email must have an "@"');
        return errors;
      }
      const [_, domain] = email.split("@");
      if (!domain.includes(".")) errors.push('Domain must include "."');

      return errors;
    },
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    validator: (password) => {
      const errors = [];

      if (!SPECIAL_CHAR.some((char) => password.includes(char))) {
        errors.push("Password must include at least one special character");
      }

      if (password.split("").every(isNaN) || password.length < 8) {
        errors.push(
          "Password must have at least one number and be at least 8 characters"
        );
      }

      return errors;
    },
  },
];

async function POST(form) {
  if (form.email.length > 10) {
    return {
      status: "failed",
      error: "Internal Server Error",
    };
  }

  return { status: "ok" };
}

export default function SignupForm() {
  const [form, setForm] = useState(
    Object.fromEntries(FIELDS.map(({ id }) => [id, { value: "", errors: [] }]))
  );

  const setValue = (value, field) => {
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
      },
    }));
  };

  const setErrors = (errors, field) => {
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        errors,
      },
    }));
  };

  const handleSubmit = async () => {
    let validationFailed = false;

    for (const { id, validator } of FIELDS) {
      const errors = validator(form[id].value);
      if (errors.length > 0) validationFailed = true;
      setErrors(errors, id);
    }

    if (validationFailed) return;

    const body = Object.fromEntries(
      Object.entries(form).map(([k, { value }]) => [k, value])
    );

    const { status, error } = await POST(body);

    if (status === "failed") {
      return alert(`There was an issue: ${error}`);
    }
    alert("Success!");
  };

  return (
    <div className={styles.SignupForm}>
      {FIELDS.map(({ id, label, type }) => {
        const { value, errors } = form[id];
        return (
          <div key={id} className={styles.field}>
            <label>{label}</label>
            <div className={styles.combo}>
              <input
                value={value}
                type={type}
                onChange={({ target }) => setValue(target.value, id)}
                className={styles.input}
              />
              {errors.length > 0 && (
                <ul className={styles.errors}>
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
      <button className={styles.button} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
