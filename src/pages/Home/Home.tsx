/** @format */

import AppDownload from "../../components/AppDownload"
import Appointment from "../../components/Appointment"
import Hero from "../../components/Hero"
import HowDoesItWork from "../../components/HowDoesItWork"
import Partners from "../../components/Partners"
import Professionals from "../../components/Professionals"
import Services1 from "../../components/Services1"
import Services2 from "../../components/Services2"
import "./Home.css"
import { Helmet } from "react-helmet"

function Home() {
	return (
		<>
			<Helmet>
				<title>Mental Support</title>
				<meta name="description" content="Mental Health Home Page" />
			</Helmet>
			<Hero />
			<Professionals />
			<Services1 />
			<HowDoesItWork />
			<Services2 />
			<AppDownload />
			<Appointment />
			<Partners />
		</>
	)
}

export default Home
