import instance from "./axiosConfig.js";

const SetupInterceptors = (navigate) => {
    instance.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.solarBanking_accessToken;
            const refreshToken = localStorage.solarBanking_refreshToken;
            const user_id = localStorage.solarBanking_userId;
            if (accessToken !== "undefined" && refreshToken !== "undefined") {
                config.headers["access_token"] = accessToken;
                config.headers["refresh_token"] = refreshToken;
                config.headers["user_id"] = user_id;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (res) => {
            if (res.data.accessToken && !res.data.refreshToken) {
                const originalConfig = res.config;
                localStorage.solarBanking_accessToken = res.data.accessToken;
                return instance(originalConfig);
            }
            return res;
        },
        async (err) => {
            if (err.response.status === 401) {
                alert("Login session was expired! Please login again to continue using application.");
                navigate('/');
            }

            return Promise.reject(err);
        }
    );
};

export default SetupInterceptors;