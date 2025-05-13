import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { LogIn, LogOut } from 'react-feather';

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
  return (
    <div className="navbar bg-base-100 flex justify-between shadow-sm ">
      <a className="btn btn-ghost text-xl">Cupy Store</a>
      {authUser && (
        <button className="btn btn-ghost text-xl" onClick={logout}>
          <LogOut />
        </button>
      )}
        {!authUser && (
            <a href="/login" className="btn btn-ghost text-xl">
            <LogIn />
            </a>
        )}
    </div>
  )
}

export default Navbar