export default function SignupForm() {
  return(
    <>
      <h1>
        Signup Form
      </h1>
      <p>
      Build a user Signup form in React with the following features. 

      <ol>
        <li>An email and a password input</li>
        <li>Email must have an “@” and the domain side must include a “.”</li>
        <li>Password must include
          <ol>
            <li>At least one special character</li>
            <li>one number and be at least 8 characters</li>
          </ol>
        </li>
        <li>Validation and error handling
          <ol>
            <li>Client-side validations</li>
            <li>Server side errors</li>
          </ol>
        </li>
        <li>Basic aesthetics with pure CSS</li>
      </ol>
      </p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/M8fqHaJU_cc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </>
  )
}
