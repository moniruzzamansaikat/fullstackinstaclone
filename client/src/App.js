import Navbar from "./components/Navbar/Navbar";
import { Route, Switch } from "react-router";
import routes from "./utils/routes.js";
import { useDispatch, useSelector } from "react-redux";
import DropDownMenu from "./components/Shared/DropDownMenu";
import PrivatePage from "./pages/PrivatePage";
import { useEffect } from "react";
import { checkAuthenticatinon, fetchNotifications } from "./store/auth/auth";
import Meta from "./components/Meta";
import MainLoader from "./components/Shared/MainLoader";
import io from "socket.io-client";
import { setActiveUsers } from "./store/users/users";
import Notif from "./components/Shared/Notif";
import "./App.css";

export let socket;

function App() {
  const dispatch = useDispatch();
  const { uploadingPhotos } = useSelector((state) => state.photos);
  const { openDropdownMenu } = useSelector((state) => state.posts);
  const { user, token, fetchingUser } = useSelector((state) => state.auth);

  // fetch notifs
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(checkAuthenticatinon(token));
  }, [token, dispatch]);

  // socket io
  useEffect(() => {
    socket = io.connect("https://saikim.herokuapp.com/");
    if (user) {
      socket.emit("connect_user", user?._id);
    }

    socket.on("active_users", (users) => {
      dispatch(setActiveUsers(users));
    });
  }, [dispatch, user]);

  if (fetchingUser) return <MainLoader />;

  return (
    <div>
      {(uploadingPhotos || openDropdownMenu) && (
        <div className="main_overlay"></div>
      )}

      {openDropdownMenu && <DropDownMenu />}
      {user && <Navbar />}

      <Notif />
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
