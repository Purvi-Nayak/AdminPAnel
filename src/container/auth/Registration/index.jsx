// index.jsx
import React from "react";
import { Link } from "react-router-dom";
import useRegistration from "./use-registration";
import CustomButton from "../../../shared/custombutton";
import CustomModal from "../../../shared/custommodal";
import FormGroup from "../../../shared/FormGroup";

const Registration = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    alertOpen,
    setAlertOpen,
    errorMessage,
    successMessage,
    isSuccess,
  } = useRegistration();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Create Account</h2>

        {alertOpen &&
          (errorMessage ? (
            <div className="mb-4 text-sm text-red-600">{errorMessage}</div>
          ) : (
            <div className="mb-4 text-sm text-green-600">{successMessage}</div>
          ))}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormGroup
            label="Username"
            name="name"
            type="text"
            register={register}
            error={errors.name}
            placeholder="Enter your username"
          />

          <FormGroup
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            placeholder="Enter your email"
          />

          <FormGroup
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
            placeholder="Enter your password"
          />

          <FormGroup
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />

          <div className="space-y-2">
            <label className="block font-medium text-black">Role</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register("role")}
                  value="user"
                  className="h-4 w-4 text-primarymain border-gray-300 rounded-full"
                />
                <span className="ml-2 text-sm text-black">User</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register("role")}
                  value="admin"
                  className="h-4 w-4 text-primarymain border-gray-300 rounded-full"
                />
                <span className="ml-2 text-sm text-black">Admin</span>
              </label>
            </div>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">
                {errors.role.message}
              </p>
            )}
          </div>

          <CustomButton
            label="Register"
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          />
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm text-primarymain hover:text-primarydark"
          >
            Already have an account? Login here
          </Link>
        </div>
      </div>

      <CustomModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title={
          isSuccess ? "Registration Successful" : "Registration Failed"
        }
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
            ? "Registration successful! Redirecting..."
            : "User already exists or registration failed."}
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
    </div>
  );
};
export default Registration;
