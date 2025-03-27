import { NavigateFunction } from "react-router-dom";

export const isNetworkAvailable = (): boolean => {
  return navigator.onLine;
};

/**
 * Navigate to a given path with optional replace behavior
 * @param navigate - useNavigate function
 * @param path - Destination path
 * @param replace - Whether to replace the history (default: false)
 */
export const navigateTo = (
  navigate: NavigateFunction,
  path: string,
  replace: boolean = false
) => {
  navigate(path, { replace });
};
