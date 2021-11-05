import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { registerUser } from "../store/auth/auth";
import banner from "../images/banner.png";
import "./styles/LoginPage.css";
import "./styles/RegisterPage.css";

function RegisterPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (user) {
      return history.replace(from);
    }
  }, [user, history, from]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const authData = {
      name,
      email,
      password,
      password1,
    };
    dispatch(registerUser(authData));
  };

  return (
    <div className="login_page register_page">
      <header style={{ backgroundImage: `url(${banner})` }}>
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
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil cum
            obcaecati cumque? Tenetur porro voluptatum quo accusantium
            asperiores nisi deserunt veniam incidunt eius, nesciunt, non in
            ipsam provident repellendus ipsa.
          </p>
        </aside>

        <section>
          <h2>Welcome to saik.net</h2>
          <div className="content">
            <h1>[Reigster Now]</h1>

            <form onSubmit={handleLoginSubmit} className="register_form">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                <label htmlFor="password1">Repeat Password</label>
                <input
                  type="password"
                  id="password1"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default RegisterPage;
