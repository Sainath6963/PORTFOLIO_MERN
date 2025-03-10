import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllUserError,
  getUser,
  resetProfile,
  updateProfile,
  logout, // Import logout action if required
} from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  // State Hooks
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || "");
  const [portfolioURL, setPortfolioURL] = useState(user?.portfolioURL || "");
  const [LinkedInURL, setLinkedInURL] = useState(user?.LinkedInURL || "");
  const [githubURL, setGithubURL] = useState(user?.githubURL || "");
  const [instagramURL, setInstagramURL] = useState(user?.instagramURL || "");
  const [XURL, setXURL] = useState(user?.XURL || "");
  const [facebookURL, setFacebookURL] = useState(user?.facebookURL || "");
  const [avatar, setAvatar] = useState(user?.avatar?.url || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");
  const [resume, setResume] = useState(user?.resume?.url || "");
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || "");

  // Handlers
  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("LinkedInURL", LinkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("XURL", XURL);
    formData.append("facebookURL", facebookURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserError());
    }

    if (isUpdated) {
      toast.success(message || "Profile updated successfully!");

      if (email !== user?.email) {
        toast.info("Email updated. Please log in again.");
        dispatch(logout()); // Log out user if email changed
        navigate("/login");
      } else {
        dispatch(getUser());
      }

      dispatch(resetProfile());
    }
  }, [dispatch, error, isUpdated, message, email, user?.email, navigate]);

  return (
    <div className="w-full h-full">
      <div className="grid w-full gap-6">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">Update Profile</h1>
          <p className="text-muted-foreground">Update Your Profile</p>
        </div>
        <div className="grid gap-4">
          {/* Profile Image Upload */}
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="grid gap-2 w-full sm:w-72">
              <Label>Profile Image</Label>
              <img
                src={avatarPreview || "./noprofile.jpg"}
                alt="avatar"
                className="w-full sm:w-72 sm:h-72 rounded-2xl"
              />
              <Input type="file" onChange={avatarHandler} className="w-full" />
            </div>

            {/* Resume Upload */}
            <div className="grid gap-2 w-full sm:w-72">
              <Label>Resume</Label>
              <Link to={resumePreview} target="_blank">
                <img
                  src={resumePreview || "./noprofile.jpg"}
                  alt="resume preview"
                  className="w-full sm:w-72 sm:h-72 rounded-2xl"
                />
              </Link>
              <Input type="file" onChange={resumeHandler} className="w-full" />
            </div>
          </div>

          {/* Text Inputs */}
          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Phone</Label>
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>About Me</Label>
            <Textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
            />
          </div>

          {/* Social Links */}
          {[
            ["Portfolio URL", portfolioURL, setPortfolioURL],
            ["LinkedIn URL", LinkedInURL, setLinkedInURL],
            ["Github URL", githubURL, setGithubURL],
            ["Instagram URL", instagramURL, setInstagramURL],
            ["Twitter(X) URL", XURL, setXURL],
            ["Facebook URL", facebookURL, setFacebookURL],
          ].map(([label, value, setter], idx) => (
            <div key={idx} className="grid gap-2">
              <Label>{label}</Label>
              <Input
                type="text"
                value={value}
                onChange={(e) => setter(e.target.value)}
              />
            </div>
          ))}

          {/* Update Button */}
          {!loading ? (
            <Button onClick={handleUpdateProfile} className="w-full">
              Update Profile
            </Button>
          ) : (
            <SpecialLoadingButton content={"Updating"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
