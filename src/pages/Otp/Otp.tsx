/** @format */

import React, { useState, useEffect } from "react"
import config from "../../configs/config"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios" // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch } from "react-redux"
import { setUserInformation, addUser } from "../../store/slices/UserSlice"

// axios.defaults.baseURL = "http://localhost:5000"

const PersonalizedOtp: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const registeredEmail = localStorage.getItem("registeredEmail")
	const password = localStorage.getItem("registeredpassword")
	console.log("Registered Email:", registeredEmail, "password", password)

	const [otp, setOtp] = useState<string>("")
	const [verificationError, setVerificationError] = useState<string | null>(
		null
	)

	const handleOtpChange = (value: string) => {
		setOtp(value)
		setVerificationError(null) // Reset error when OTP changes
	}

	// const handleVerifyClick = async () => {
	// 	try {
	// 		// Call your verification logic here
	// 		const response = await axios.post(
	// 			`${config.base_url}/otp/verify-otp`,
	// 			{
	// 				userEmail: registeredEmail,
	// 				userOTP: otp,
	// 			}
	// 		)

	// 		if (response.data.status === 200) {
	// 			console.log("OTP Verified successfully")
	// 			navigate("/login")

	// 			// If OTP is verified successfully, you can redirect the user or perform other actions
	// 		} else {
	// 			setVerificationError("Invalid OTP. Please try again.")
	// 			toast.error("Invalid OTP. Please try again.")
	// 		}
	// 	} catch (error) {
	// 		console.error("Error verifying OTP:", error)
	// 		setVerificationError("An error occurred while verifying OTP.")
	// 	}
	// }
	const handleVerifyClick = async () => {
		try {
			const response = await axios.post(
				`${config.base_url}/otp/verify-otp`,
				{
					userEmail: registeredEmail,
					userOTP: otp,
					userPassword: password,
				}
			)
			console.log(
				"Sending Request with userEmail:",
				registeredEmail,
				"otp:",
				otp,
				"UserPasswrod",
				password
			)
			localStorage.removeItem("registeredpassword")

			localStorage.setItem("registeredEmail", registeredEmail)
			console.log("resultOfLogin ", response)

			if (response?.data?.status === 200) {
				toast.success("OTP Verified")
			}

			// THIS IS FOR PATIENT
			if (
				response?.data?.accessToken &&
				response?.data?.data?.level == 13
			) {
				console.log("userData", response.data.data)
				const { age, uid, name } = response?.data?.data
				localStorage.setItem("age", age)
				let token = response?.data?.accessToken

				localStorage.setItem(
					"user_information",
					JSON.stringify(response?.data?.data)
				)

				Cookies.set("token", token)

				if (token) {
					const res = await axios.post(
						`${config.base_url}/patient/psc_test_check`,
						{ uid, name },
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					)

					console.log("resOfPatient Check ", res.data)
					dispatch(setUserInformation(res.data.data))
					localStorage.setItem(
						"user_complete_information",
						JSON.stringify(res.data.data)
					)

					if (res?.data?.program_data_uid) {
						toast.success(" Verification Successful Redirecting")
						navigate("/patient-dashboard")
					} else {
						toast.success(" Verification Successful Redirecting")
						navigate("/psc-test")
					}
				}
			}

			// THIS IS FOR DOCTOR
			else if (
				response?.data?.accessToken &&
				response?.data?.data?.level == 11
			) {
				console.log("login result", response)
				const { age, uid, name } = response?.data?.data
				localStorage.setItem("age", age)

				const token = response?.data?.accessToken
				Cookies.set("token", token)
				// `${config.base_url}/doctor/is_doctor_registered/pathan/c26fbc47-fb8e-4255-91a2-32d5eee81470`
				let user = JSON.stringify(response?.data?.data)

				if (token) {
					const res = await axios.get(
						`${config.base_url}/doctor/is_doctor_registered/${name}/${uid}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					)
					const updateUser = {
						age,
						name,
						uid,
						...res.data.data,
					}
					console.log("is_registered_respose", res)
					localStorage.setItem(
						"doctor_information",
						JSON.stringify(updateUser)
					)
					localStorage.setItem(
						"user_complete_information",
						JSON.stringify(updateUser)
					)

					if (res?.data?.data) {
						// The login was successful, navigate after 5 seconds
						// toast.success("Login Successful") // Show the success toast

						const getDoctorCompleteProfileRes = await axios.get(
							`${config.base_url}/doctor/get_doctor_complete_profile/${res.data.data.id}/${uid}`,
							{
								headers: {
									Authorization: `Bearer ${token}`, // Add the authorization token here with the "Bearer" prefix
								},
							}
						)

						console.log(
							"getDoctorCompleteProfileRes",
							getDoctorCompleteProfileRes
						)
						if (
							getDoctorCompleteProfileRes?.data?.data?.length > 0
						) {
							let {
								doctor_details,
								professional_experience,
								schedule,
							} = getDoctorCompleteProfileRes?.data?.data[0]
							let myObj = {
								...res?.data?.data,
								doctor_details,
								professional_experience,
								schedule,
							}
							dispatch(setUserInformation(myObj))
							toast.success(
								" Verification Successful Redirecting"
							)

							navigate("/doctor-dashboard") // Navigate after 5 seconds
						}
					} else {
						// The login was successful, navigate after 5 seconds
						// toast.success("Login Successful") // Show the success toast

						localStorage.setItem("doctor_information", user)
						toast.success(" Verification Successful Redirecting")
						navigate("/academic-information") // Navigate after 5 seconds
					}
				}
			}

			// FOR TEACHER LOGIN
			else if (
				response?.data?.accessToken &&
				response?.data?.data?.role === "teacher"
			) {
				toast.success("Login Successful")
				Cookies.set("token", response?.data?.accessToken)
				localStorage.setItem(
					"teacher_information",
					JSON.stringify(response?.data?.data)
				)

				navigate("/teacher-dashboard")

				// `${config.base_url}/doctor/is_doctor_registered/pathan/c26fbc47-fb8e-4255-91a2-32d5eee81470`
			}

			//FOR INSTITUTE LOGIN
			else if (
				response?.data?.accessToken &&
				response?.data?.data?.role === "institute"
			) {
				toast.success("Login Successful")
				Cookies.set("token", response?.data?.accessToken)
				localStorage.setItem(
					"institute_information",
					JSON.stringify(response?.data?.data)
				)
				setTimeout(() => {
					navigate("/institute-dashboard")
				}, 3000)
				// `${config.base_url}/doctor/is_doctor_registered/pathan/c26fbc47-fb8e-4255-91a2-32d5eee81470`
			}

			// FOR STUDENT LOGIN
			else if (
				response?.data?.accessToken &&
				response?.data?.data?.role === "student"
			) {
				toast.success("Login Successful")
				Cookies.set("token", response?.data?.accessToken)
				localStorage.setItem(
					"student_information",
					JSON.stringify(response?.data?.data)
				)
				setTimeout(() => {
					navigate("/student-dashboard")
				}, 3000)
				// `${config.base_url}/doctor/is_doctor_registered/pathan/c26fbc47-fb8e-4255-91a2-32d5eee81470`
			} else {
				setVerificationError("Invalid OTP. Please try again.")
				toast.error("Invalid OTP. Please try again.")
			}
		} catch (error) {
			console.error("Error verifying OTP:", error)
			toast.error(error.response.data.message)
			navigate("/login")
			setVerificationError("An error occurred while verifying OTP.")
		}
	}

	const handleSendOtp = async () => {
		// try {
		// 	const response = await axios.post(
		// 		`${config.base_url}/otp/send-otp`,
		// 		{
		// 			userEmail: registeredEmail,
		// 		}
		// 	)

		// 	if (response.data.status === 200) {
		// 		console.log("OTP sent successfully")
		// 		toast.success("OTP is send to your email")
		// 		// You can show a message to the user that OTP has been sent
		// 	} else {
		// 		console.error("Error sending OTP:", response.data.message)
		// 	}
		// } catch (error) {
		// 	console.error("Error sending OTP:", error)
		// }

		try {
			const response = await axios.post(
				`${config.base_url}/otp/send-otp`,
				{
					userEmail: registeredEmail,
				}
			)

			if (response.status === 200) {
				console.log("OTP sent successfully")
				toast.success("OTP is sent to your email")
				// You can show a message to the user that OTP has been sent
			} else {
				console.error("Error sending OTP:", response.data.message)
			}
		} catch (error) {
			console.error("Error sending OTP:", error)
		}
	}

	const handleRegenerateOtp = async () => {
		try {
			const response = await axios.post(
				`${config.base_url}/otp/regenerate-otp`,
				{
					userEmail: registeredEmail,
				}
			)

			if (response.status === 200) {
				console.log("OTP sent successfully")
				toast.success("OTP is send to your email")

				// You can show a message to the user that OTP has been sent
			} else {
				console.error("Error sending OTP:", response.data.message)
			}
		} catch (error) {
			console.error("Error sending OTP:", error)
		}
	}

	useEffect(() => {
		handleSendOtp()
	}, [])

	return (
		<div className="container mt-5  ">
			<div className="row justify-content-center">
				<div className="col-md-4">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title text-center">
								OTP Verification
							</h5>
							<p className="card-text text-center">
								Enter the OTP sent to your mail
							</p>

							<div className="form-group text-center md-5">
								<label htmlFor="otpInput" className="sr-only">
									OTP
								</label>
								<input
									type="text"
									id="otpInput"
									className={`form-control mb-2 ${
										verificationError ? "is-invalid" : ""
									}`}
									value={otp}
									onChange={(e) =>
										handleOtpChange(e.target.value)
									}
									maxLength={6}
									placeholder="Enter OTP"
								/>
								{verificationError && (
									<div className="invalid-feedback">
										{verificationError}
									</div>
								)}
							</div>

							<div className="text-center mt-4">
								<button
									className="btn btn-primary btn-block m-2"
									onClick={handleVerifyClick}>
									Verify OTP
								</button>
								<button
									className="btn btn-primary btn-block "
									onClick={handleRegenerateOtp}>
									Regenerate OTP
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	)
}

export default PersonalizedOtp
