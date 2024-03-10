/** @format */

import React, { useState } from "react"
import { Form, Row, Col, InputGroup, Container, Modal } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import Button from "../Common/Buttons/Button"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { BsCalendar } from "react-icons/bs"
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css" // Import the styles for the date picker
import { Link, useNavigate } from "react-router-dom"
// import { useActionsUsersRegistrationMutation } from "../../gql/generated"
import { usePatientRegistrationMutation } from "../../gql/generated"
// import { useDoctorRegistrationMutation } from "../../gql/generated";
// import Tooltips from "../Common/Tooltips";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import config from "../../configs/config"
import { getToken } from "../../utils"
import { countryList } from "../../constants/constants"
import TermsAndConditions from "../../components/TermsAndConditions"
interface FormValues {
	name: string
	phone: string
	email: string
	dob: string
	gender: number
	address: string
	state: string
	zip_code: string
	city: string
	country: string
	password: string
	confirmPassword: string
	level: number
}

const RegistrationForm: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [checkboxChecked, setCheckboxChecked] = useState(false)
	const [showGuideline, setShowGuidline] = useState(true)
	// const [showModal, setShowModal] = useState(false)
	const [result, executeMutation] = usePatientRegistrationMutation()

	const navigate = useNavigate()
	const initialValues: FormValues = {
		name: "",
		phone: "",
		email: "",
		dob: new Date("2004-06-30T19:00:00.000Z").toString(),
		gender: 7,
		address: "",
		state: "",
		zip_code: "",
		city: "",
		country: "",
		password: "",
		confirmPassword: "",
		level: 13,
	}

	// const handleShowModal = () => {
	// 	setShowModal(true)
	// }

	// const handleCloseModal = () => {
	// 	setShowModal(false)
	// }
	const handleShowGuideline = () => {
		setShowGuidline(!showGuideline)
	}

	const handleTermsClick = () => {
		// Open the "Terms and Conditions" page in a new tab
		window.open("/termsandcondition", "_blank")
	}

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		phone: Yup.string().required("Phone number is required"),
		email: Yup.string()
			.email("Invalid email")
			.required("Email is required"),
		dob: Yup.date()
			.required("Date of Birth required")
			.max(new Date(), "Date of Birth cannot be in the future"),
		gender: Yup.number().required("Gender is required"),
		address: Yup.string().required("Address is required"),
		state: Yup.string().required("State is required"),
		zip_code: Yup.string().required("Zip Code is required"),
		city: Yup.string().required("City is required"),
		country: Yup.string().required("Country is required"),
		// password: Yup.string()
		// 	.min(8, "Password must be at least 8 characters")
		// 	.required("Password is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters long")
			.matches(
				/[a-z]/,
				"Password must contain at least one lowercase letter"
			)
			.matches(
				/[A-Z]/,
				"Password must contain at least one uppercase letter"
			)
			.matches(/[0-9]/, "Password must contain at least one digit")
			.matches(
				/[\^\$\\.\[\]|{}()?\*\+\-\@]/,
				"Password must contain at least one special character"
			)
			.required("Password is required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), undefined], "Passwords must match")
			.required("Confirm Password is required"),
	})

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			if (values.dob == new Date("2004-06-30T19:00:00.000Z").toString()) {
				return toast.error("Date of Birth is required")
			}
			const selectedDate = new Date(values.dob)
			const currentDate = new Date()

			// Calculate age difference in milliseconds
			const ageDifferenceInMilliseconds =
				(currentDate as any) - (selectedDate as any)
			// Calculate age difference in years
			const ageDifferenceInYears =
				ageDifferenceInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)

			if (ageDifferenceInYears < 2) {
				return toast.error(
					"You must be at least 2 years old to register"
				)
			}

			if (!checkboxChecked) {
				return toast.error("Please accept the terms and conditions")
			}

			values.gender = Number(values.gender)

			const dobDate = new Date(values.dob)
			const formattedDob = dobDate.toISOString()

			values.dob = formattedDob

			const { confirmPassword, ...dataToSend } = values
			console.log("dataToSend", dataToSend)
			try {
				let { email, phone, level } = dataToSend
				const isRegisteredResponse = await axios.get(
					`${config.base_url}/user/isAlreadyRegister/${email}/${phone}/${level}`,
					{
						headers: {
							Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
						},
					}
				)
				console.log(
					"isRegisteredResponse",
					isRegisteredResponse?.data?.isRegistered
				)
				if (isRegisteredResponse?.data?.isRegistered) {
					return toast.error("Email Or Phone is already registered")
				} else {
					const result = await axios.post(
						`${config.base_url}/user/register`,
						dataToSend
					)
					console.log("Registration response", result?.data?.message)
					localStorage.setItem("registeredEmail", values.email)
					localStorage.setItem("registeredpassword", values.password)
					toast.success(result?.data?.message) // Show the success toast
					// setTimeout(() => {
					//   navigate("/login"); // Navigate after 5 seconds
					// }, 3000);
					setTimeout(() => {
						navigate("/otp-verification") // Navigate after 3 seconds
						// navigate(/"/login"); // Navigate after 3 seconds
					}, 1000)
				}
			} catch (error) {
				toast.error("Registration not successful")
				console.error(error)
			}
		},
	})

	return (
		<Container className="login__section">
			<Row className="mb-4 ">
				<Col sm={12} className="">
					<h1>
						Signup
						<br />
						<span className="txt__green">Mental Support</span> 👋
					</h1>
				</Col>
			</Row>
			<Form onSubmit={formik.handleSubmit} className="reg__form">
				<Row className="mb-3">
					<Form.Group as={Col} lg={6} sm={12}>
						<Form.Control
							type="text"
							placeholder="Name"
							id="name"
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.name && !!formik.errors.name
							}
						/>
						{formik.touched.name && formik.errors.name && (
							<small className="text-danger">
								{formik.errors.name}
							</small>
						)}
						{/* {formik.touched.name && formik.errors.name && (
							<Form.Control.Feedback type="invalid">
								{formik.errors.name}
							</Form.Control.Feedback>
						)} */}
					</Form.Group>
					<Form.Group as={Col} lg={6} sm={12}>
						<Form.Control
							type="text"
							placeholder="Phone Number"
							id="phone"
							name="phone"
							value={formik.values.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.phone && !!formik.errors.phone
							}
						/>
						{formik.touched.phone && formik.errors.phone && (
							<small className="text-danger">
								{formik.errors.phone}
							</small>
							// <Form.Control.Feedback type="invalid">
							// 	{formik.errors.phone}
							// </Form.Control.Feedback>
						)}
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} lg={12} sm={12}>
						<Form.Control
							type="email"
							placeholder="Email"
							id="email"
							name="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.email && !!formik.errors.email
							}
						/>
						{formik.touched.email && formik.errors.email && (
							<small className="text-danger">
								{formik.errors.email}
							</small>
							// <Form.Control.Feedback type="invalid">
							//   {formik.errors.email}
							// </Form.Control.Feedback>
						)}
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} lg={6} sm={12}>
						<InputGroup className="customDatePickerWidth">
							<label htmlFor="dob">Date of Birth</label>
							<input
								style={{
									width: "100%",
									border: "1px solid rgba(0, 0, 0, 0.1)",
								}}
								type="date"
								value={formik.values.dob}
								onChange={(event) =>
									formik.setFieldValue(
										"dob",
										event.target.value
									)
								}
								onBlur={formik.handleBlur}
								id="dob"
								name="dob"
								className={
									formik.touched.gender &&
									!!formik.errors.gender
										? "is-invalid"
										: ""
								}
							/>
						</InputGroup>
						{formik.touched.dob && formik.errors.dob && (
							<small className="text-danger">
								{formik.errors.dob}
							</small>
							// {formik.errors.dob}
							// <Form.Control.Feedback type="invalid">
							// 	{formik.errors.dob}
							// </Form.Control.Feedback>
						)}
					</Form.Group>
					<Form.Group as={Col} lg={6} sm={12}>
						<label htmlFor="dob">Sex</label>
						<Form.Control
							as="select"
							id="gender"
							name="gender"
							value={formik.values.gender}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="gender"
							isInvalid={
								formik.touched.gender && !!formik.errors.gender
							}>
							<option value={7}>Male</option>
							<option value={8}>Female</option>
						</Form.Control>
						{formik.touched.gender && formik.errors.gender && (
							<small className="text-danger">
								{formik.errors.gender}
							</small>
							// <Form.Control.Feedback type="invalid">
							// 	{formik.errors.gender}
							// </Form.Control.Feedback>
						)}
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} lg={12} sm={12}>
						<Form.Control
							type="text"
							placeholder="Address"
							id="address"
							name="address"
							value={formik.values.address}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.address &&
								!!formik.errors.address
							}
						/>
						{formik.touched.address && formik.errors.address && (
							<small className="text-danger">
								{formik.errors.address}
							</small>
							// <Form.Control.Feedback type="invalid">
							//   {formik.errors.address}
							// </Form.Control.Feedback>
						)}
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} lg={6} sm={12}>
						<Form.Control
							type="text"
							placeholder="State/Province"
							id="state"
							name="state"
							value={formik.values.state}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.state && !!formik.errors.state
							}
						/>
						{formik.touched.state && formik.errors.state && (
							<small className="text-danger">
								{formik.errors.state}
							</small>
							// <Form.Control.Feedback type="invalid">
							// 	{formik.errors.state}
							// </Form.Control.Feedback>
						)}
					</Form.Group>
					<Form.Group as={Col} lg={6} sm={12}>
						<Form.Control
							type="text"
							placeholder="Zip/POBox Code"
							id="zip_code"
							name="zip_code"
							value={formik.values.zip_code}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.zip_code &&
								!!formik.errors.zip_code
							}
						/>
						{formik.touched.zip_code && formik.errors.zip_code && (
							<small className="text-danger">
								{formik.errors.zip_code}
							</small>
							// <Form.Control.Feedback type="invalid">
							// 	{formik.errors.zip_code}
							// </Form.Control.Feedback>
						)}
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} lg={6} sm={12}>
						<Form.Control
							type="text"
							placeholder="City"
							id="city"
							name="city"
							value={formik.values.city}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.city && !!formik.errors.city
							}
						/>
						{formik.touched.city && formik.errors.city && (
							<small className="text-danger">
								{formik.errors.city}
							</small>
							// <Form.Control.Feedback type="invalid">
							// 	{formik.errors.city}
							// </Form.Control.Feedback>
						)}
					</Form.Group>
					<Form.Group as={Col} lg={6} sm={12}>
						<Form.Control
							as="select"
							id="country"
							name="country"
							value={formik.values.country}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.country &&
								!!formik.errors.country
							}>
							<option value="" label="Select a country" />
							{countryList.map((country, index) => (
								<option key={index} value={country}>
									{country}
								</option>
							))}
						</Form.Control>
						{formik.touched.country && formik.errors.country && (
							<small className="text-danger">
								{formik.errors.country}
							</small>
							// <Form.Control.Feedback type="invalid">
							// 	{formik.errors.country}
							// </Form.Control.Feedback>
						)}
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} lg={6} sm={12}>
						<InputGroup>
							<Form.Control
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								id="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								isInvalid={
									formik.touched.password &&
									!!formik.errors.password
								}
							/>
							<InputGroup.Text
								onClick={() => setShowPassword(!showPassword)}
								style={{ cursor: "pointer" }}
								className="icon">
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</InputGroup.Text>
						</InputGroup>
						{formik.touched.password && formik.errors.password && (
							<small className="text-danger">
								{formik.errors.password}
							</small>

							// <Form.Control.Feedback type="invalid">
							// 	{formik.errors.password}
							// </Form.Control.Feedback>
						)}
						{!formik.errors.password && showGuideline && (
							<small>
								Password must be 8 characters and must contain
								one uppercase, one special character and one
								digit
							</small>
						)}
					</Form.Group>
					<Form.Group as={Col} lg={6} sm={12}>
						<InputGroup>
							<Form.Control
								type={showConfirmPassword ? "text" : "password"}
								placeholder="Confirm Password"
								id="confirmPassword"
								name="confirmPassword"
								value={formik.values.confirmPassword}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								isInvalid={
									formik.touched.confirmPassword &&
									!!formik.errors.confirmPassword
								}
							/>
							<InputGroup.Text
								onClick={() =>
									setShowConfirmPassword(!showConfirmPassword)
								}
								style={{ cursor: "pointer" }}
								className="icon">
								{showConfirmPassword ? (
									<FaEyeSlash />
								) : (
									<FaEye />
								)}
							</InputGroup.Text>
						</InputGroup>
						{formik.touched.confirmPassword &&
							formik.errors.confirmPassword && (
								<small className="text-danger">
									{formik.errors.confirmPassword}
								</small>
								// <Form.Control.Feedback type="invalid">
								// 	{formik.errors.confirmPassword}
								// </Form.Control.Feedback>
							)}
					</Form.Group>
				</Row>
				<Row ClassName="mb-3">
					{/* <Form.Group controlId="termsCheckbox" className="mb-3">
						<Form.Check
							type="checkbox"
							label={
								<div className="text-center m-3 mr-4">
									{"I agree to the "}
									<span
										style={{
											cursor: "pointer",
											textDecoration: "underline",
										}}
										onClick={() => {
											if (!checkboxChecked) {
												// Only open modal if the checkbox is not checked
												setShowModal(!showModal)
                        console.log(showModal)
											}
										}}>
										terms and conditions
									</span>
								</div>
							}
							checked={checkboxChecked}
							onChange={() =>
								setCheckboxChecked(!checkboxChecked)
							}
							className="custom-checkbox"
						/>
					</Form.Group> */}
					<Form.Group controlId="termsCheckbox" className="mb-3">
						<Row className=" align-items-center">
							<Col xs="auto">
								<input
									type="checkbox"
									checked={checkboxChecked}
									onChange={() =>
										setCheckboxChecked(!checkboxChecked)
									}
									style={{
										marginTop: "8px",
										transform: "scale(2)",
									}}
								/>
							</Col>
							<Col xs="auto">
								<div className="text-center m-3 mr-4">
									{"I agree to the "}
									<span
										style={{
											cursor: "pointer",
											textDecoration: "underline",
										}}
										onClick={handleTermsClick}>
										terms and conditions
									</span>
								</div>
							</Col>
						</Row>
					</Form.Group>
					{/* <TermsAndConditions
						show={showModal}
						handleClose={handleCloseModal}
					/> */}
				</Row>
				<Button
					title={"Sign-up"}
					className="w-100 my-4"
					type="submit"
					disabled={formik.isSubmitting || !checkboxChecked}
				/>

				<Row className="text-center">
					<span style={{ fontSize: "14px" }}>
						Have an account?{" "}
						<Link to="/login" className="account__link">
							Login
						</Link>
					</span>
				</Row>
			</Form>

			<ToastContainer />
		</Container>
	)
}

export default RegistrationForm

// ////////////////////////////// dispatch and selector store in a variable
// import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../../store/slices/UserSlice";

// ////////////////////////////// dispatch and selector store in a variable
// const dispatch = useDispatch();
// const userState = useSelector(
//   (state: { user: { users: Array<Object> } }) => state.user.users[0]
// );
// console.log("userState", userState);

// ////////////////////////////// Dispatch call a function and change the state using a button
// <Row>
// <Col>
//   <button
//     type="button"
//     onClick={() => {
//       dispatch(addUser([{ name: "fayyaz ansar" }]));
//     }}
//   >
//     click
//   </button>
// </Col>
// </Row>
