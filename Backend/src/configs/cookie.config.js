export const cookieConfigs = {
    expiresIn: 1000 * 60 * 60, // Change to 1 hour instead of 5 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
}
