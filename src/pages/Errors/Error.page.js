import { useRouteError } from "react-router-dom";
import "./index.css";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-wraper" id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message || error.error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
