import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1";

// Create a pre-configured Axios instance
export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Response interceptor – log errors and redirect on auth failure
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const isAuthPage =
          window.location.pathname.startsWith("/login") ||
          window.location.pathname.startsWith("/register");
        // Only hard-redirect if we are NOT already on an auth page
        // to avoid a redirect loop on the login screen itself.
        if (!isAuthPage) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Typed helper wrappers around the Axios instance.
 * Each returns the `data` payload directly for convenience.
 */
export async function get<T>(url: string, config?: any): Promise<T> {
  const res = await api.get<T>(url, config);
  return res.data;
}

export async function post<T>(url: string, payload: any, config?: any): Promise<T> {
  const res = await api.post<T>(url, payload, config);
  return res.data;
}

export async function put<T>(url: string, payload: any, config?: any): Promise<T> {
  const res = await api.put<T>(url, payload, config);
  return res.data;
}

export async function del<T>(url: string, config?: any): Promise<T> {
  const res = await api.delete<T>(url, config);
  return res.data;
}