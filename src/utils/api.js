import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Important for cookie handling
});

// Response interceptor for standardizing response format
api.interceptors.response.use(
  (response) => {
    // Keep your existing response formatting
    let newResponse;
    if (response.data.message) {
      newResponse = { status: response.status, message: response.data.message };
    } else {
      newResponse = { status: response.status, data: response.data.data };
    }
    return newResponse;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration and refresh
    // Check if the error is due to an expired token (401) and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        // If refresh successful, update the token
        if (refreshResponse.status === 200 && refreshResponse.data.data) {
          // Store the new token
          localStorage.setItem("accessToken", refreshResponse.data.data);

          // Update auth header for the original request
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${refreshResponse.data.data}`;

          // Update default headers for future requests
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${refreshResponse.data.data}`;

          // Try to update user after refresh
          // window.dispatchEvent(new Event("tokenRefreshed"));
          // Retry the original request with the new token
          return api(originalRequest);
        }
      } catch (refreshError) {
      console.log(refreshError);
      }
    }

    // Format the error as before
    const newError = {
      status: error.response?.status,
      message: error.response?.data?.message || "An error occurred",
      expired: error.response?.data?.expired,
    };

    return Promise.reject(newError);
  }
);

// Request interceptor to add the authorization token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
