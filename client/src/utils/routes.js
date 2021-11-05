import AddPost from "../pages/AddPost";
import HomePage from "../pages/HomePage";
import MessagesPage from "../pages/MessagesPage";
import NotificationsPage from "../pages/NotificationsPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import SettingsPage from "../pages/SettingsPage";
import PublicProfile from "../pages/PublicProfile";
import FollowersPage from "../pages/FollowersPage";
import FollowingPage from "../pages/FollowingPage";
import SavedPage from "../pages/SavedPage";
import PostPage from "../pages/PostPage";
import AboutUs from "../pages/AboutUs";

const routes = [
  {
    path: "/",
    component: <HomePage />,
    title: "InstaClone",
    exact: true,
    private: true,
  },
  {
    path: "/messages",
    component: <MessagesPage />,
    title: "Messages",
    exact: true,
    private: true,
  },
  {
    path: "/messages/t/:userId",
    component: <MessagesPage />,
    title: "Messages",
    exact: true,
    private: true,
  },
  {
    path: "/settings",
    component: <SettingsPage />,
    title: "Settings",
    exact: true,
    private: true,
  },
  {
    path: "/add",
    component: <AddPost />,
    title: "Add Post",
    exact: true,
    private: true,
  },
  {
    path: "/notifications",
    component: <NotificationsPage />,
    title: "Notifications",
    exact: true,
    private: true,
  },
  {
    path: "/saved",
    component: <SavedPage />,
    title: "Saved Posts",
    exact: true,
    private: true,
  },
  {
    path: "/profile",
    component: <ProfilePage />,
    title: "Profile",
    exact: true,
    private: true,
  },
  {
    path: "/profile/:id",
    component: <PublicProfile />,
    exact: true,
    private: true,
  },
  {
    path: "/profile/:id/followers",
    component: <FollowersPage />,
    title: "Followers",
    exact: true,
    private: true,
  },
  {
    path: "/profile/:id/following",
    component: <FollowingPage />,
    title: "Following",
    exact: true,
    private: true,
  },
  {
    path: "/register",
    component: <RegisterPage />,
    title: "Register",
    exact: true,
    private: false,
  },
  {
    path: "/posts/:id",
    component: <PostPage />,
    exact: true,
    private: true,
  },
  {
    path: "/login",
    component: <LoginPage />,
    title: "Login",
    exact: true,
    private: false,
  },
  {
    path: "/about-us",
    component: <AboutUs />,
    title: "About",
    exact: true,
    private: false,
  },
];

export default routes;
