import React from "react";
import { Link } from "react-router-dom";
import banner from "../images/banner.png";
import "./styles/LoginPage.css";

function AboutUs() {
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
          <h4>About Saikim</h4>
          <p>
            This website is created for demo purpose. The developer tried to
            make a simple clone of instagram for his personal project.
          </p>
        </aside>

        <section>
          <h2>Welcome to saik.net</h2>
          <div className="content">
            <p>
              This site was created for demo purspose only. The Deveoper tried
              to make a simple clone of{" "}
              <a href="https://instagram.com">Instagram</a>.
            </p>
            <p>Used node.js, react.js, vanilla css, socket.io, mongodb.</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              dignissimos rem totam dolorum nulla ipsa officiis est, quae,
              quaerat magni quia dicta alias sequi a aspernatur incidunt. Nobis
              eveniet perspiciatis, itaque cumque ducimus repellat molestias.
              Praesentium fugiat nisi ipsam pariatur voluptatem, temporibus
              optio atque obcaecati aut quae aperiam a maiores sequi quo odio
              possimus perferendis veritatis nostrum ad eaque autem aliquam
              magnam nobis! Ab doloribus, nostrum modi odio nam commodi placeat
              soluta quidem quaerat! Voluptatem facere corporis molestiae quo
              mollitia eaque culpa id voluptatum hic dolorum. Neque dignissimos
              consequuntur dolorem! Magni molestiae nobis iste perspiciatis
              eveniet ad veniam voluptatem qui, quisquam nostrum nesciunt saepe
              omnis doloribus repellat dolores id animi optio earum dignissimos
              pariatur aut minima. Minima tenetur dolorum id? Illum minus
              delectus repudiandae velit repellendus, blanditiis optio minima
              ullam ratione fugiat voluptates unde perferendis impedit
              laudantium cumque fugit ipsa, omnis sequi vitae, porro error
              aliquid natus laboriosam. Vero suscipit maiores quos, ipsam neque
              quas soluta nulla. Sit, vel tempore? Fugit incidunt qui autem,
              alias, temporibus, id ducimus nostrum possimus accusamus
              reprehenderit quo impedit ratione est. Suscipit possimus omnis
              veniam ducimus ex totam optio, ab aliquid quae enim similique
              voluptates modi blanditiis exercitationem dignissimos aut
              aspernatur non est expedita asperiores.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;
