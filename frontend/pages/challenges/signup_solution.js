import * as React from 'react';

const serviceCall = () => new Promise((res, rej) => rej('Login validation issues'))

const hasNumber = (pwd) => {
  for(let i = 0; i < pwd.length; i++) {
    if (pwd.charAt(i) >= 0 || pwd.charAt(i) <= 9) return true
  }
  return false
}

const hasSpecialChar = (pwd) => {
  const specialChars = `!@#$%^&*()_+-=[]{};:',.<>/?\\|`;
  for (let i = 0; i < pwd.length; i++) {
    if (specialChars.includes(pwd.charAt(i))) {
      return true;
    }
  }
  return false;
};

export default function SignupForm() {
  const [errors, setErrors] = React.useState([])
  // investigate errors object
  const validateSubmit = (form) => {
    const email = form.email.value
    const password = form.password.value
    const arrErrors = []
    const emailError = !(email.includes('@') && email.split('@')[1].includes('.'))
    if(emailError) {
      arrErrors.push(`Email must have an “@” and the domain side must include a “.”`)
    }
    const passwordError = password.length < 8 || !hasNumber(password) || !hasSpecialChar(password);
    if(passwordError) {
      arrErrors.push(`Password must include: At least one special character and one number and be at least 8 characters `)
    }
    setErrors(arrErrors)
    return !(emailError || passwordError)
  }

  const submitForm = (e) => {
    e.preventDefault()
    const validForm = validateSubmit(e.currentTarget)
    if (validForm) {
      serviceCall().then(()=> {
        console.log('logged in successfully`');
      }).catch((message) => {
        setErrors([message])
      })
    } else {
      console.log('You had an frontend validation error')
    }

  }
  return (
    <form onSubmit={submitForm}>
      <h1>Sign up form</h1>
      <div>
        <input type="email" name="email" placeholder="Write your email" />
      </div>
      <div>
        <input type="password" name="password" placeholder="Write your password" />
      </div>
      <div className='error'>
        {errors.map(errorMessage => <p>{errorMessage}</p>)}
      </div>
      <button type="submit" name="submit">Submit</button>
    </form>
  )
}
