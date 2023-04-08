import React, {useRef, useEffect} from 'react'

const Login = () => {
  const base_url = process.env.REACT_APP_SERVER_URL;
  const login_missing_ref = useRef(null);
  const login_bad_ref = useRef(null);
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const user_email = event.target[0].value;
    const user_pass = event.target[1].value;

    const resp = await fetch(`${base_url}/mangadb/login`, {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email,
        user_pass
      })
    })
    const data = await resp.json();
    if (data.user){
        localStorage.setItem('session_id', data.sessionID);
        login_bad_ref.current.style.display = 'none';
        login_missing_ref.current.style.display = 'none';
        localStorage.setItem('login_missing', 'false');
        window.location.href = '/homepage';
    }else{
        login_missing_ref.current.style.display = 'none';
        localStorage.setItem('login_missing', 'false');
        login_bad_ref.current.style.display = 'block';
    }
  }

  useEffect( () => {
    if (localStorage.getItem('login_missing') == 'true'){
        login_missing_ref.current.style.display = 'block';
    }
  }, [])

  return (
    <div>
        <section>
        <div class="form-box-login">
            <div class="form-value">
                <form onSubmit={handleLoginSubmit}>
                    <h2>Login</h2>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" id="user_email" required/>
                        <label for="user_email">Email</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" id="user_password" required/>
                        <label for="user_password">Password</label>
                    </div>
                    <button type='submit'>Log in</button>
                    <div class="register">
                        <p>Don't have a account <a href="/">Register</a></p>
                    </div>
                    <div class='error-msg' id="Login_Missing" ref={login_missing_ref}>
                        Please Login!
                    </div>
                    <div class='error-msg' id="Login_Bad" ref={login_bad_ref}>
                        Invalid email or password!
                    </div>
                </form>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Login