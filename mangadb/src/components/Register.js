import React, { useRef } from "react";

const Register = () => {
  const register_bad = useRef(null);
  const password_bad = useRef(null);
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const user_name = event.target[0].value;
    const user_email = event.target[1].value;
    const user_pass = event.target[2].value;
    const confirm_user_pass = event.target[3].value;

    //checks to see that the inputted user password is correct
    if(user_pass === confirm_user_pass){
      const resp = await fetch(`/mangadb/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name,
          user_email,
          user_pass,
        }),
      });
      const data = await resp.json();
      //checks to see that the inputted credentials are valid to use
      if (data.user) {
        register_bad.current.style.display = "none";
        password_bad.current.style.display = "none"
        window.location.href = "/login";
      } else {
        password_bad.current.style.display = "none"
        register_bad.current.style.display = "block";
      }
    } else {
      register_bad.current.style.display = "none";
      password_bad.current.style.display = "block"
    }
    
  };

  return (
    <div>
      <section>
        <div class="form-box">
          <div class="form-value">
            <form onSubmit={handleRegisterSubmit}>
              <h2>Register</h2>
              <div class="inputbox">
                <ion-icon name="person-outline"></ion-icon>
                <input type="text" id="user_name" required />
                <label for="user_name">Username</label>
              </div>
              <div class="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input type="email" id="user_email" required />
                <label for="user_email">Email</label>
              </div>
              <div class="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type="password" id="user_pass" required />
                <label for="user_pass">Password</label>
              </div>
              <div class="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type="password" id="confirm_user_pass" required />
                <label for="confirm_user_pass">Confirm Password</label>
              </div>
              <button type="submit">Register</button>
              <div class="register">
                <p>
                  Already have an account? <a href="/login">Log in</a>
                </p>
              </div>
              <div class="error-msg" id="Register_Bad" ref={register_bad}>
                Email or Username already used!
              </div>
              <div class="error-msg" id="Password_Bad" ref={password_bad}>
                Passwords are not identical!
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
