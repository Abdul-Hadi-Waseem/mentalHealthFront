/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"

import { appRoutes } from "./constants/constants"
import AppLayout from "./Layout/AppLayout"
import ProtectedRoute from "../src/components/ProtectedRoute" // Import your ProtectedRoute component
import Loader from "../src/components/Loader"
import { Suspense } from "react"
import { Helmet } from "react-helmet"

const App = () => {
	const queryClient = new QueryClient()

	return (
		<Router>
			<Helmet>
				<title>Mental Support</title>
			</Helmet>

			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<Loader />}>
					<AppLayout>
						<Routes>
							{appRoutes.map((route) => {
								if (
									[7, 9, 10, 11, 14, 15, 16].includes(
										route.id
									)
								) {
									// Check if the route is protected
									return (
										<Route
											key={route.id}
											path={route.path}
											element={
												<ProtectedRoute
													element={route.Component}
												/>
											}
										/>
									)
								} else {
									return (
										<Route
											key={route.id}
											path={route.path}
											element={route.Component}
										/>
									)
								}
							})}
						</Routes>
					</AppLayout>
				</Suspense>
			</QueryClientProvider>
		</Router>
	)
}

export default App
