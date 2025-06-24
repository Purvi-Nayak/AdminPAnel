import React from "react";
import { Link } from "react-router-dom";
import useLogin from "./use-login";
import CustomButton from "../../../shared/custombutton";
import FormGroup from "../../../shared/FormGroup";
import Checkbox from "../../../shared/checkbox";
import CustomModal from "../../../shared/custommodal";

const Login = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    alertOpen,
    setAlertOpen,
    errorMessage,
    successMessage,
    rememberMe,
    setRememberMe,
    isSuccess,
    onSubmit,
  } = useLogin();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded shadow">
          <h2 className="text-center text-2xl font-bold mb-6">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormGroup
              label="Email"
              name="email"
              register={register}
              error={errors.email}
              type="email"
              placeholder="Enter your email"
            />
            <FormGroup
              label="Password"
              name="password"
              register={register}
              error={errors.password}
              type="password"
              placeholder="Enter your password"
            />

            <div className="flex items-center justify-between">
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link
                to="/forgotpassword"
                className="text-sm font-medium text-primarymain hover:text-primarydark"
              >
                Forgot password?
              </Link>
            </div>

            <CustomButton
              label="Login"
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            />
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/register"
              className="text-sm text-primarymain hover:text-primarydark"
            >
              Don't have an account? Register here
            </Link>
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title={isSuccess ? "Login Successful" : "Login Failed"}
        contentClass="p-4"
        overlayClass="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        showCloseIcon={true}
        titleClass={
          isSuccess
            ? "bg-green-50 text-green-600 border-b border-green-100"
            : "bg-red-50 text-red-600 border-b border-red-100"
        }
      >
        <div
          className={`text-center ${
            isSuccess ? "text-green-700" : "text-gray-700"
          } mb-4`}
        >
          {isSuccess
            ? successMessage || "Login successful! Redirecting..."
            : errorMessage || "Invalid credentials. Please try again."}
        </div>
        <div className="flex justify-center">
          <CustomButton
            label="OK"
            onClick={() => setAlertOpen(false)}
            className={`${
              isSuccess
                ? "bg-green-600 hover:bg-green-700"
                : "bg-primarymain hover:bg-primarydark"
            } text-white px-8 py-2 rounded-md`}
          />
        </div>
      </CustomModal>
    </>
  );
};

export default Login;
