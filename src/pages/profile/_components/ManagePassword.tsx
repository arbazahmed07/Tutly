import { actions } from "astro:actions";
import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Profile = ({ userProfile }: any) => {
  const email = userProfile?.email;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const newPassword = watch("newPassword", "");
  const confirmPassword = watch("confirmPassword", "");

  const togglePasswordVisibility = (type: string) => {
    switch (type) {
      case "old":
        setShowOldPassword(!showOldPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const newPasswordStrength = checkStrength(newPassword);
  const confirmPasswordStrength = checkStrength(confirmPassword);

  const getStrengthScore = (strength: { met: boolean; text: string }[]) => {
    return strength.filter((req) => req.met).length;
  };

  const newPasswordScore = useMemo(
    () => getStrengthScore(newPasswordStrength),
    [newPasswordStrength]
  );
  const confirmPasswordScore = useMemo(
    () => getStrengthScore(confirmPasswordStrength),
    [confirmPasswordStrength]
  );

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  const onSubmit = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!userProfile?.email) {
      toast.error("An error occurred while updating the profile");
      return;
    }

    try {
      const { data: response, error } = await actions.users_updatePassword({
        email: userProfile?.email,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      if (error || !response) {
        toast.error("Failed to update the profile");
        return;
      }

      if (response.success) {
        toast.success("Profile updated successfully");
      } else {
        toast.error(response?.error?.message ?? "An unknown error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the profile");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const { data: response, error } = await actions.users_resetPassword({
        email: userProfile?.email,
      });

      if (error) {
        toast.error("Failed to send password reset link");
        return;
      }

      toast.success("Login again to create new password");
      const signout = await fetch("/api/auth/signout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while sending password reset link");
    }
  };

  const renderPasswordField = (
    fieldName: string,
    label: string,
    showPassword: boolean,
    toggleVisibility: () => void,
    strength: { met: boolean; text: string }[],
    strengthScore: number
  ) => (
    <div>
      <label className="mb-1 block w-full">
        {label}
        {fieldName === "oldPassword" && (
          <a
            onClick={handleForgotPassword}
            className="text-xs ml-2 text-blue-500 hover:cursor-pointer hover:text-red-700"
          >
            forgot?
          </a>
        )}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={label}
          className="w-full rounded-md border border-gray-300 bg-background px-3 py-2 outline-none"
          {...register(fieldName, { required: true, minLength: 8 })}
        />
        <span className="absolute right-2 top-2 cursor-pointer" onClick={toggleVisibility}>
          {showPassword ? <FaRegEyeSlash className="h-5 w-5" /> : <FaRegEye className="h-5 w-5" />}
        </span>
      </div>
      {fieldName !== "oldPassword" && (
        <>
          <div
            className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={strengthScore}
            aria-valuemin={0}
            aria-valuemax={4}
            aria-label="Password strength"
          >
            <div
              className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
              style={{ width: `${(strengthScore / 4) * 100}%` }}
            ></div>
          </div>
          <p className="mb-2 text-sm font-medium text-foreground">
            {getStrengthText(strengthScore)}. Must contain:
          </p>
          <ul className="space-y-1.5" aria-label="Password requirements">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                {req.met ? (
                  <Check size={16} className="text-emerald-500" aria-hidden="true" />
                ) : (
                  <X size={16} className="text-muted-foreground/80" aria-hidden="true" />
                )}
                <span
                  className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
                >
                  {req.text}
                  <span className="sr-only">
                    {req.met ? " - Requirement met" : " - Requirement not met"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
      {errors[fieldName]?.type === "required" && (
        <span className="text-red-500">{label} is required</span>
      )}
      {errors[fieldName]?.type === "minLength" && (
        <span className="text-red-500">{label} must have more than 8 characters</span>
      )}
    </div>
  );

  return (
    <div className="flex justify-center text-sm font-semibold text-black dark:text-white">
      <div className="m-auto rounded-lg p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-[300px] flex-col gap-2">
            {renderPasswordField(
              "oldPassword",
              "Old Password",
              showOldPassword,
              () => togglePasswordVisibility("old"),
              [],
              0
            )}

            {renderPasswordField(
              "newPassword",
              "New Password",
              showNewPassword,
              () => togglePasswordVisibility("new"),
              newPasswordStrength,
              newPasswordScore
            )}

            {renderPasswordField(
              "confirmPassword",
              "Confirm Password",
              showConfirmPassword,
              () => togglePasswordVisibility("confirm"),
              confirmPasswordStrength,
              confirmPasswordScore
            )}

            {newPassword !== confirmPassword && (
              <span className="text-red-500">Passwords do not match</span>
            )}

            <button
              type="submit"
              className="mt-4 rounded-md bg-blue-600 p-3 text-sm font-semibold text-white"
              disabled={
                newPassword !== confirmPassword || newPasswordScore < 4 || confirmPasswordScore < 4
              }
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
