import React from "react";
import ReactDOM from "react-dom/client";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Interceptor from "./components/util/Interceptor.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<SkeletonTheme baseColor="#2A2F4A" highlightColor="#3B476B">
				<Interceptor />
				<RouterProvider router={router} />
			</SkeletonTheme>
		</Provider>
	</React.StrictMode>
);
