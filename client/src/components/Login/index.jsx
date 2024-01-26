import { useEffect, useState } from "react";
import {useNavigate,Navigate} from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";


function Login() {
	const history = useNavigate()
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [isChecked, setIsChecked] = useState(false);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect (() => {
	if(localStorage.getItem('token')) {
		setIsLoggedIn(true);
	}
	}, []);


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	  };

	  
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8000/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/home";
		} catch (error) {
			if (error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		isLoggedIn ? <Navigate to="/home"/> :
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>

						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input} />
						{error && <div className={styles.error_msg}>{error}</div>}
						<div className={styles.remember}>
						<label>
							<input
								type="checkbox"
								checked={isChecked}
								onChange={handleCheckboxChange}
							/>
							Remember Me
						</label>
						<a href="/">Forget Password</a>
						</div>
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div> 
	);
}

export default Login;
