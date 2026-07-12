import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { User } from "../types/apiTypes";

export function useMoveInvalidAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const user_str = localStorage.getItem("user");

    if (!user_str) {
      navigate("/");
      return;
    }

    try {
      const user: User = JSON.parse(user_str);
      user
    } catch {
      navigate("/");
    }
  }, [navigate]);
}