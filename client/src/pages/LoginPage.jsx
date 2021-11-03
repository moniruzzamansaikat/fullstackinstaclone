import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import { loginUser } from "../store/auth/auth";

function LoginPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (user) {
      history.push(from);
    }
  }, [user, from, history]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const authData = {
      email,
      password,
    };
    dispatch(loginUser(authData));
  };

  return (
    <MainLayout>
      <h2>Login</h2>

      <form action="" onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
          <p>
            or <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </MainLayout>
  );
}

export default LoginPage;
