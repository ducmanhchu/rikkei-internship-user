import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Homepage from "../pages/Homepage";
import Albums from "../pages/Albums";
import Artists from "../pages/Artists";
import Genres from "../pages/Genres";
import TopTracks from "../pages/TopTracks";
import History from "../pages/History";
import Downloads from "../pages/Downloads";
import Favourites from "../pages/Favourites";
import AlbumDetail from "../pages/AlbumDetail";
import ArtistDetail from "../pages/ArtistDetail";
import Profile from "../pages/Profile";
import GenreDetail from "../pages/GenreDetail";
import SearchResult from "../pages/SearchResult";
import ShowAll from "../pages/ShowAll";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <Homepage /> },
			{
				path: "albums",
				element: <Albums />,
			},
			{
				path: "artists",
				element: <Artists />,
			},
			{
				path: "genres",
				element: <Genres />,
			},
			{
				path: "top-tracks",
				element: <TopTracks />,
			},
			{
				path: "history",
				element: <History />,
			},
			{
				path: "downloads",
				element: <Downloads />,
			},
			{
				path: "favourites",
				element: <Favourites />,
			},
			{
				path: "albums/:albumID",
				element: <AlbumDetail />,
			},
			{
				path: "artists/:artistID",
				element: <ArtistDetail />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			{
				path: "genres/:genreID",
				element: <GenreDetail />,
			},
			{
				path: "search",
				element: <SearchResult />,
			},
			{
				path: "show-all/:type",
				element: <ShowAll />,
			},
		],
	},
]);
