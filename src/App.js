import { ToastContainer } from "react-toastify";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "./pages/Products/products.page";
import ErrorPage from "./pages/Errors/Error.page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Products />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <RouterProvider router={router} />
      {/* <div className="App"></div> */}
    </>
  );
}

export default App;
