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

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
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
