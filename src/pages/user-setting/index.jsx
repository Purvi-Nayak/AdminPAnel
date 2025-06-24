import React from "react";
import FormGroup from "../../shared/FormGroup";
import CustomButton from "../../shared/custombutton";
import useUserSetting from "./use-usersetting";

const UserSetting = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    errorMessage,
    setErrorMessage,
    successMessage,
    onSubmit,
  } = useUserSetting();

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-10">
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative">
          <div className="flex justify-between items-center">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage("")}
              className="text-red-500 hover:text-red-700 ml-4 focus:outline-none"
              aria-label="Close error message"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormGroup
          label="Current Password"
          name="currentPassword"
          type="password"
          register={register}
          error={errors.currentPassword}
          placeholder="Enter current password"
        />

        <FormGroup
          label="New Password"
          name="newPassword"
          type="password"
          register={register}
          error={errors.newPassword}
          placeholder="Enter new password"
        />

        <FormGroup
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          register={register}
          error={errors.confirmPassword}
          placeholder="Confirm new password"
        />

        <CustomButton
          label={isSubmitting ? "Updating..." : "Update Password"}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primarymain hover:bg-primarydark"
        />
      </form>
    </div>
  );
};

export default UserSetting;
