import React, {useState, useEffect} from 'react';

const LOGIN_ERROR = {
  EMAIL_AT: 'Missing @ on Email',
  EMAIL_DOMAIN: 'Domain Missing',
  PASSWORD_CHARACTERS: 'Missing Special Characters',
  PASSWORD_LENGTH : 'Password Most Contain at Least 8 Characters'
};

const API_RESPONSE = {
  ERROR: 'Username is take',
  SUCCESS: 'Your Account has been successfully created!'
};


function API(data) {
  return new Promise((res) => {
    const DELAY = 1000;
    const USERS_STORAGE = '_signed_users';

    const localUsers = localStorage.getItem(USERS_STORAGE);
    const users = localUsers ? JSON.parse(localUsers) : [];
    const findUser = users.some((user) => user.email === data.email);
    

    if (findUser) {
      setTimeout(() => res({ error: API_RESPONSE.ERROR }), DELAY);
    } else {
      localStorage.setItem(USERS_STORAGE, JSON.stringify([...users, data]))
      setTimeout(() => res({ success: API_RESPONSE.SUCCESS }), DELAY);
    }
  });
}


// Evaluate if the email string contains @.
function emailAt (email){
  const evaluateEmail = email.split('@').length;
  const response = evaluateEmail < 2 && LOGIN_ERROR.EMAIL_AT;
  return {'email': response};
}

// Evaluate if the Domain exist.
function emailDomain(email){
  const evaluateEmail = email.split('@');
  const response = (!evaluateEmail[1] || (evaluateEmail[1].split('.').pop() === '')) && LOGIN_ERROR.EMAIL_DOMAIN;
  return {'email': response};
}

// Evaluate if the password contains special characters.
function passwordCharacter(password){
  const specialCharacter = '!&/_-.?¿*';
  const evaluatePassword = specialCharacter.split('').some((character) => password.includes(character));
  const response = !evaluatePassword && LOGIN_ERROR.PASSWORD_CHARACTERS;
  return {'password': response};
}

// Validate Password Length.
function passwordLength(password) {
  const passwordLength = password.length;
  const response = passwordLength < 8 && LOGIN_ERROR.PASSWORD_LENGTH;
  return {'password': response};
}

// Compound who run each validation function and store the returned error in an array.
function validateForm(...func) {
  return func.reduce((errors, fn) => {
    const response = fn;
    const key = Object.keys(response);
    errors[key] = (errors[key] || []);
    response[key] && errors[key].push(response[key]);
    return errors;
  }, {});
}

export default function SignupForm() {
  const [passwordType, setPasswordType] = useState('password');
  const [passwordIcon, setPasswordIcon] = useState('🔒');
  const [apiResponse, setApiResponse] = useState({});

  const [errorEmail, setErrorEmail] = useState([]);
  const [errorPassowrd, setErrorPassword] = useState([]);
  

  useEffect(() => {
    const iconType = passwordType === 'text' ? '🔓' : '🔒';
    setPasswordIcon(iconType);
  }, [passwordType]);

  // Set Password Type
  const handlePasswordType = (e) => {
    e.preventDefault();
    setPasswordType(prev => prev === 'text' ? 'password': 'text')
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const {email, password} = data;
    
    // Reset Api Response
    setApiResponse([]);

    // Evaluate Form Inputs.
    const response = validateForm(
      emailAt(email),
      emailDomain(email),
      passwordCharacter(password),
      passwordLength(password)
    );
    
    setErrorEmail(response['email']);
    setErrorPassword(response['password']);

    // If inputs are corrects, make a request to the api.
    (response['email'].length === 0 && response['password'].length === 0) && API(data).then(setApiResponse);
  }


  // Render Inputs Errors.
  const RenderErrors = ({errors}) => {
    return errors.map((error, index) => <div className='login-form_error' key={index}>{error}</div>)
  }


  // Render Api Response.
  const RenderApiResponse = () => {
    if(apiResponse.success || apiResponse.error) {
      return apiResponse.success 
      ?  <h3 className='signup-message signup-success'>{apiResponse.success }</h3>
      :  <h3 className='signup-message signup-alert'>{apiResponse.error }</h3> 
    }

    return;  
  }
 
  return(
    <>
      <div className='container flex flex-center'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2 className='login-form_title'>SIGNUP</h2>
        <RenderApiResponse />
        <div className='login-form_input'>
          <label>Email</label>
          <input type="text" name="email" placeholder="Email" />
          <RenderErrors errors={errorEmail} />
        </div>
        <div className='login-form_input'>
            <label>Password</label>
            <div className='login-form_password'> 
              <input type={passwordType} name="password" placeholder="Password" />
              <button onClick={handlePasswordType}>{passwordIcon} </button>
            </div>
          <RenderErrors errors={errorPassowrd} />
          </div>
        <button className='submit' type="submit">Sign Up</button>
      </form>
      </div>
    </>
  )
}
