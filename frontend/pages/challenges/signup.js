function API(data) {
  return new Promise((res) => {
    setTimeout(
      () =>
        res({
          success: "Your Account has been successfully created!",
          error: "Username is taken",
        }),
      1000
    );
  });
}

export default function SignupForm() {
  return(
    <>
      <h1>
        Signup Form
      </h1>
      <p>
        Build a user Signup form in React with the following features.

        1. An email and a password input
        2. Email must have an “@” and the domain side must include a “.”
        3. Password must include
            1.  at least one special character
            2. one number and be at least 8 characters
        4. Submission request handling  
           1. Utilze the mock API function to handle submissions
        5. Basic aesthetics with pure CSS
      </p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/M8fqHaJU_cc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </>
  )
}
