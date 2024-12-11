import React, { useEffect, useState } from "react";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllForgotPasswordErrors,
  resetPassword,
} from "@/store/slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotpassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResettPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message !== null) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, loading]);
  return (
    <>
      <Card className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 mb-6">
              Reset Password
            </CardTitle>
            <CardDescription className="block text-gray-700 font-medium mb-2">
              Set A New Password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="Confirm Password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {loading ? (
                <SpecialLoadingButton content={"Resetting Password"} />
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleResettPassword}
                >
                  Reset password
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default ResetPassword;
