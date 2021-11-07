import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { loginUser } from "../store/auth/auth";
import "./styles/LoginPage.css";

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
    <div className="login_page">
      <header>
        <div></div>
        <div className="site_info">
          <p className="logo">[saik.net]</p>
          <ul className="menu">
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
            <li>
              <Link to="/about-us">about</Link>
            </li>
          </ul>
        </div>
      </header>

      <main>
        <aside>
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
            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </aside>

        <section>
          <h2>Welcome to saik.net</h2>
          <div className="content">
            <h1>[Welcome to the saik.net]</h1>

            <p>Connect to your friends and family online .........</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem id
              eum, reprehenderit, accusamus molestias perspiciatis sunt velit
              obcaecati debitis magni vero iusto deleniti, ex consequatur
              nostrum rerum numquam esse neque.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LoginPage;
