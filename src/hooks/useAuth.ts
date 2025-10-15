import type { User } from "../types/types";
import { useAuthStore } from "../stores/authStore";

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    logout: storeLogout,
  } = useAuthStore();

  const login = async (
    uname: string,
    pass: string
  ): Promise<User | undefined> => {
    const u = await doLoginStuff(uname, pass);
    if (u) {
      setUser(u);
      setIsAuthenticated(true);
      return u; // Return the user data for immediate use
    }
    return undefined;
  };

  const logout = () => {
    storeLogout();
  };

  const register = async (
    userData: Omit<User, "id" | "adminUser" | "isServer" | "imageUrl">
  ) => {
    // Implement registration logic here
    const response = await fetch("http://localhost:3008/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to save user");
    }

    const user: User = await response.json();

    setUser(user);
    setIsAuthenticated(true);
  };

  const doLoginStuff = async (
    uname: string,
    pass: string
  ): Promise<User | undefined> => {
    try {
      const response = await fetch("http://localhost:3008/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: uname,
          password: pass,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData: User = await response.json();
      return userData;
    } catch (error) {
      console.error("Error during login:", error);
      return undefined;
    }
  };

  return { user, isAuthenticated, login, logout, register };
};
