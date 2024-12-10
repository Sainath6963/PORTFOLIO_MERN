import {
  clearAllForgotPasswordErrors,
  forgotPassword,
} from "@/store/slices/forgotResetPasswordSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotpassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgotPassword = () => {
    dispatch(forgotPassword(email));
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
              Forgot Password
            </CardTitle>
            <CardDescription className="block text-gray-700 font-medium mb-2">
              Enter Your Email To Request For Reset Password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
              <div className="grid gap-2">
                <Link
                  to={"/login"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Login?
                </Link>
              </div>
              {loading ? (
                <SpecialLoadingButton content={"Requesting"} />
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleForgotPassword}
                >
                  Request For Reset password
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default ForgotPassword;
