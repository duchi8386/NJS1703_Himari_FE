import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { googleLogin } from "../authService";
import { useAuth } from "../../context/AuthContext";

export const useGoogleAuth = () => {
  const { login } = useAuth();

  const handleGoogleAuth = useCallback(
    async (idToken) => {
      try {
        console.log("✅ Processing Google Auth with ID Token");

        const response = await googleLogin(idToken);
        const { accessToken, refreshToken } = response.data.data;
        const decodedToken = jwtDecode(accessToken);

        const role =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        const userId = Number(decodedToken.UserId);

        console.log("✅ Auth Details:", { role, userId });

        // Let AuthContext handle the login
        if (role === "3" || role === "4") {
          await login(accessToken, refreshToken, userId, role);
        }

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
    },
    [login]
  );

  return handleGoogleAuth;
};
