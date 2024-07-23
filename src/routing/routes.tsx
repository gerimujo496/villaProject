import Layout from "../pages/Layout";
import { createBrowserRouter } from "react-router-dom";
import VillaList from "../pages/VillaList";
import VillaDetails from "../pages/VillaDetails";
import PrivateRoutes from "../pages/PrivateRoutes";
import { SignIn } from "../pages/SingIn/SingIn";
import { SignUp } from "../pages/Singup/Singup";
import { WishList } from "../components/WishList/WishList";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Layout />,
        errorElement: <h1>Something went wrong!</h1>,
        children: [
          { index: true, element: <VillaList /> },
          { path: "villas/:villaId", element: <VillaDetails /> },
          { path: "wishlist", element: <WishList/> },
          {
            path: "admin",
            element: <h1>Hello from Admin</h1>,
          },
        ],
      },
    ],
  },
]);

export default router;
