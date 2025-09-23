import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Interceptor from "./components/util/Interceptor.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<Interceptor />
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
