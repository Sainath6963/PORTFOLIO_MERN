import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllUserError,
  resetProfile,
  updatePassword,
} from "@/store/slices/userSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { currentPassword, newPassword, confirmNewPassword } = formData;
  const { loading, isAuthenticated, error, message, isUpdated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserError());
    }
    if (isUpdated) {
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, message, isUpdated]);

  return (
    <div className="w-full h-full">
      <div className="grid w-[100%] gap-6">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">Update Password</h1>
          <p className="text-balance text-muted-foreground">
            Update Your Password
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label>New Password</Label>
            <Input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={handleChange}
            />
          </div>
          {!loading ? (
            <Button onClick={handleUpdatePassword} className="w-full">
              Update Password
            </Button>
          ) : (
            <SpecialLoadingButton content={"Updating Password"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
