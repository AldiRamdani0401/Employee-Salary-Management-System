import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from '../../features/authSlice';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
      (state) => state.auth
    );

    useEffect(() => {
        if (user || isSuccess) {
          navigate("/dashboard");
        }

        const delayReset = setTimeout(() => {
          dispatch(reset());
        }, 5000);

        return () => {
          clearTimeout(delayReset);
        };
      }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
      e.preventDefault();
      dispatch(LoginUser({ username, password }));
    }

  return (
    <div>
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
          <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4">
                        <form onSubmit={Auth} className='box'>
                            {isError && <p className='has-text-centered'>{message}</p>}
                            <h1 className='title is-2'>Sign In</h1>
                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control">
                                    <input type="text"
                                    className='input'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder='username'/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input type="password"
                                    className='input'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='*****'/>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <button type='submit' className="button is-success is-fullwidth">{isLoading ? "Loading..." : "Login"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Login