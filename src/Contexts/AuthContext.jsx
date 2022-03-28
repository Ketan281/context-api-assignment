import React from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
	const [isAuth, setIsAuth] = React.useState(false);
	const [token,setToken]=React.useState('')
	const toggleAuth=()=>{
		setIsAuth(isAuth===true? false:true)
	}
const onLogIn = () => {
	let data = {
		email: "eve.holt@reqres.in",
		password: "cityslicka",
	};
	fetch("https://reqres.in/api/login", {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-type": "application/json; charset=UTF-8" },
	})
		.then((response) => response.json())
		.then((res) => {

			if (res.token) {
				setIsAuth(true);
			    setToken(res.token)
			}
		})
		.catch((err) => console.log(err));
};
const onLogOut = () => {
	setIsAuth(false);
	setToken('')
};
	return <AuthContext.Provider value={{ isAuth,onLogIn, onLogOut,token,toggleAuth}} >
		{children}
	</AuthContext.Provider>
}