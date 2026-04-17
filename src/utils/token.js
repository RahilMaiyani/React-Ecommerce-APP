export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setUserId = (id) => {
    localStorage.setItem("userId", id);
}

export const removeUserId = () => {
    localStorage.removeItem("userId");
}

export const getUserId = () => {
    return localStorage.getItem("userId");
}