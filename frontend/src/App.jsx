import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast"
import { Routes, Route, Navigate } from "react-router";
import ChatPage from "./pages/ChatPage";
import SignInPage from "./pages/SignInPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/auth.store";
const App = () => {
  const { authUser, checkAuth } = useAuthStore();
  console.log("Auth User : ", authUser)
  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  return (
    <div className=" min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <SignInPage />} />
        <Route path="/signin" element={!authUser ? <SignInPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/logout" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;


