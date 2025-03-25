import React, { createContext, useContext, useState, useEffect } from "react";
import { refreshUserToken } from "../service/authService";
import { message } from "antd";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Load user khi khởi động app
  const loadUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const userId = localStorage.getItem("userId");
      const role = localStorage.getItem("userRole"); // Add role loading
      if (accessToken && userId && role) {
        // Check for role existence
        setUser({
          accessToken,
          refreshToken,
          userId,
          role, // Include role in user object
        });
      } else {
        setUser(null);
        setUserProfile(null);
      }
    } catch (error) {
      console.error("❌ Error loading user:", error);
      setUser(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Initialize auth state
  useEffect(() => {
    loadUser();
  }, []);

  const login = async (accessToken, refreshToken, userId, role) => {
    try {
      console.log("✅ AuthContext Login:", { accessToken, userId, role });

      // Save to localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", role);

      // Update context state
      const userData = {
        accessToken,
        refreshToken,
        userId,
        role,
      };

      setUser(userData);
      message.success(
        `Đăng nhập thành công (${role === "3" ? "Admin" : "Staff"})`
      );

      return true;
    } catch (error) {
      console.error("❌ Login failed:", error);
      message.error("Đăng nhập thất bại");
      return false;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole"); // Add this line
      setUser(null);
      setUserProfile(null);
      message.success("Đăng xuất thành công");
    } catch (error) {
      console.error("❌ Logout failed:", error);
      message.error("Đăng xuất thất bại");
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await refreshUserToken(refreshToken);
      const newAccessToken = response.data.data.accessToken;

      localStorage.setItem("accessToken", newAccessToken);
      setUser((prevUser) => ({ ...prevUser, accessToken: newAccessToken }));

      return newAccessToken;
    } catch (error) {
      console.error("❌ Refresh token failed:", error);
      logout();
      message.error("Phiên đăng nhập hết hạn");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        login,
        logout,
        refreshAccessToken,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
