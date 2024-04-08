import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UploadContent from "../pages/Content/Create";
import ViewTheme from "../pages/Theme/View";

const userRoutes = [
  { label: "Home", to: "/", isProtected: false, Component: Home },
  { label: "Login", to: "/login", isProtected: false, Component: Login },
  { label: "Register", to: "/signup", isProtected: false, Component: Signup },
];

const adminRoutes = [
  {
    label: "Home",
    to: "/",
    isProtected: false,
    Component: Home,
    role: ["admin", "creator", "user"],
  },
  {
    label: "Upload content",
    to: "/upload-content",
    isProtected: true,
    role: ["admin", "creator"],
    Component: UploadContent,
  },
  {
    label: "Theme",
    to: "/theme",
    isProtected: true,
    role: ["admin"],
    Component: ViewTheme,
  },
];

const commonRoutes = [];

export { userRoutes, adminRoutes, commonRoutes };
