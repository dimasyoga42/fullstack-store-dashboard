import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
    const [fromData, setFromData] = useState({
        email: "",
        password: ""
    })
    const {login, isLoggingIn } = useAuthStore()

    const handleChange = (e) => {
        e.preventDefault();
        login(fromData);
    }
return (
    <div className="w-full h-screen flex justify-center justify-items-center items-center">
        <div class="card w-96 bg-base-100 shadow-sm">
  <div class="card-body">
    <div class="flex justify-center">
      <h2 class="text-3xl font-bold">login</h2>
    </div>
    <form onSubmit={handleChange}>
        <ul class="mt-6 flex flex-col gap-4 text-xs">
        <li class="flex  justify-center">
            <input type="email" placeholder="email" name="email" class="input input-bordered w-full max-w-xs" value={fromData.email} onChange={((e) => setFromData({...fromData, email: e.target.value}))} />
        </li>
        <li class="flex  justify-center">
            <input type="password" placeholder="password" name="password" class="input input-bordered w-full max-w-xs" value={fromData.password} onChange={((e) => setFromData({...fromData, password: e.target.value}))} />
        </li>
    </ul>
    <div class="mt-3 m-auto">
      <button class="btn btn-primary btn-block" disabled={isLoggingIn}>Login</button>
      </div>
    </form>
    </div>
  </div>
</div>
)
}
export default Login;