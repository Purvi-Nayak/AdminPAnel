import React from "react";
import { useForgetPassword } from "./use-forgot";
import { Link } from "react-router-dom";
import FormGroup from "../../../shared/FormGroup";
import CustomButton from "../../../shared/custombutton";
import CustomModal from "../../../shared/custommodal";


const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    alertOpen,
    setAlertOpen,
    successMessage,
    errorMessage,
  } = useForgetPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and new password to reset your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormGroup
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            placeholder="Enter your email"
            autoComplete="email"
          />
          <FormGroup
            label="New Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
            placeholder="Enter new password"
            autoComplete="new-password"
          />
          <FormGroup
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword}
            placeholder="Confirm new password"
            autoComplete="new-password"
          />

          <div className="space-y-4">
            <CustomButton
              label={isSubmitting ? "Processing..." : "Reset Password"}
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            />
            <div className="text-center">
              <Link
                to="/"
                className="text-sm font-medium text-primarymain hover:text-primarydark"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </form>

        <CustomModal
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          title={successMessage ? "Success" : "Error"}
          className="bg-neutral-main rounded-lg p-4"
        >
          <div
            className={`text-center mb-4 ${
              successMessage ? "text-green-600" : "text-red-600"
            }`}
          >
            {successMessage || errorMessage}
          </div>
          <div className="flex justify-center">
            <CustomButton
              label="OK"
              onClick={() => {
                setAlertOpen(false);
                if (successMessage) {
                  window.location.href = "/";
                }
              }}
              className="bg-primarymain hover:bg-primarydark text-white px-8 py-2 rounded-md w-32"
            />
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default ForgetPassword;
