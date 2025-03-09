export const generateToken = (user, message, statusCode, res) => {
  if (!user.generateJsonWebToken) {
    return res
      .status(500)
      .json({ success: false, message: "JWT generation failed!" });
  }

  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Enables secure flag only in production
      sameSite: "strict", // Prevents CSRF attacks
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};
