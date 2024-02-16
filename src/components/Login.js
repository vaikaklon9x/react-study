import { useEffect, useState } from "react"
import { loginApi } from "../services/UserService"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [loadingLogin, setLoadingLogin] = useState(false)

    const { loginContext } = useContext(UserContext)


    /*useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            navigate('/')
        }
    })*/

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Email/Password is required!")
            return
        }
        setLoadingLogin(true)
        let res = await loginApi(email.trim(), password)
        if (res && res.token) {
            loginContext(email, res.token)
            navigate('/')
            // eve.holt@reqres.in | cityslicka
        } else {
            // error
            if (res && res.status === 400) {
                alert(res.data.error)
                return
            }
        }
        setLoadingLogin(false)
    }
    const handleGoBack = () => {
        navigate('/')
    }
    const handlePressEnter = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin()
        }
        console.log('event: ', event)
    }

    return (<>
        <div className="login-container col-12 col-sm-4">
            <div className="title">Log in</div>
            <div className="text">Email or Username - eve.holt@reqres.in | cityslicka</div>
            <input
                type="text"
                placeholder="Email or username..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <div className="input-2">
                <input
                    type={isShowPassword === true ? "text" : "password"}
                    placeholder="Password..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handlePressEnter(event)}
                />
                <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>

            </div>
            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >{loadingLogin && <i className="fa-solid fa-sync fa-spin"></i>} Login</button>
            <div className="back">
                <i className="fa-solid fa-angle-left"></i>
                <span onClick={() => handleGoBack()}> Go back</span>
            </div>
        </div>
    </>)
}
export default Login