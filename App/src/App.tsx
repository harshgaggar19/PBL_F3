
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "./components/ui/sonner";
import Layout from "./pages/Layout";
import SourceDestinationHome from "./pages/SourceDestinationHome";
import MatchedUsers from "./pages/MatchedUsers";
import ViewMatch from "./pages/ViewMatch";
import Chat from "./pages/Chat";
import WebRTCComponent from "./pages/Webrtc";
import NotFoundPage from "./pages/NotFoundPage"; // Import 404 Page
import { useAuth } from "@clerk/clerk-react"; // Authentication Hook
import { ReactElement } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

interface ProtectedRouteProps {
	element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
	const { isSignedIn, isLoaded } = useAuth();

	// Wait until Clerk loads before making a decision
	if (!isLoaded) return <LoadingSpinner/>; // or show a loading spinner

	return isSignedIn ? element : <Navigate to="/signup" replace />;
};


function App() {
	return (
		<>
			<Toaster richColors />
			<Router>
				<Routes>
					{/* Public Routes */}
					<Route path="/signup" element={<SignupPage />} />

					{/* Private Routes (Requires Authentication) */}
					<Route path="/" element={<Layout />}>
						<Route path="/harsh" element={<>Hello Harsh</>} />
						<Route
							path="/home"
							element={<ProtectedRoute element={<SourceDestinationHome />} />}
						/>
						<Route
							path="/matched-users"
							element={<ProtectedRoute element={<MatchedUsers />} />}
						/>
						<Route
							path="/view-match/:id"
							element={<ProtectedRoute element={<ViewMatch />} />}
						/>
					</Route>

					{/* 404 Not Found Page */}
					<Route path="*" element={<NotFoundPage />} />
					<Route path="/chat" element={<Chat></Chat>}></Route>
					<Route path="/call" element={<WebRTCComponent></WebRTCComponent>}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
