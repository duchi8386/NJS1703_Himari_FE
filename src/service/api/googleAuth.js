import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://wizlab.io.vn:9999/api/v1/auth/login/google/oauth";

export const handleGoogleAuth = async (idToken) => {
  try {
    console.log("✅ ID Token:", idToken);

    const response = await axios.post(API_URL, idToken, {
      headers: { "Content-Type": "application/json" },
    });

    const { accessToken, refreshToken } = response.data.data;
    const decodedToken = jwtDecode(accessToken);

    const role =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    const userId = Number(decodedToken.UserId);

    console.log("✅ Auth Details:", { role, userId });

    // Return necessary data
    return {
      accessToken,
      refreshToken,
      role,
      userId,
      isAuthorized: role === "3" || role === "4",
    };
  } catch (error) {
    console.error("❌ Google auth failed:", error);
    throw error;
  }
};
