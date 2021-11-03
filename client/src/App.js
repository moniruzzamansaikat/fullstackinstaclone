import Navbar from "./components/Navbar/Navbar";
import { Route, Switch } from "react-router";
import routes from "./utils/routes.js";
import { useDispatch, useSelector } from "react-redux";
import DropDownMenu from "./components/Shared/DropDownMenu";
import PrivatePage from "./pages/PrivatePage";
import { useEffect } from "react";
import { authCheck } from "./store/auth/auth";
import Meta from "./components/Meta";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { uploadingPhotos } = useSelector((state) => state.photos);
  const { openDropdownMenu } = useSelector((state) => state.posts);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authCheck());
  }, [token, dispatch]);

  return (
    <div>
      {(uploadingPhotos || openDropdownMenu) && (
        <div className="main_overlay"></div>
      )}

      {openDropdownMenu && <DropDownMenu />}

      {user && <Navbar />}
      <Switch>
        {routes.map((route, index) =>
          route.private ? (
            <PrivatePage path={route.path} exact={route.exact} key={index}>
              <div>
                <Meta title={route.title} />
                {route.component}
              </div>
            </PrivatePage>
          ) : (
            <Route path={route.path} exact={route.exact} key={index}>
              <div>
                <Meta title={route.title} />
                {route.component}
              </div>
            </Route>
          )
        )}
      </Switch>
    </div>
  );
}

export default App;
