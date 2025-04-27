const getJWTCookies = async () => {
  try {
    const response = await fetch("/api/getJWT", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data.jwt;
  } catch (err) {
    console.error(err);
  }
};

export default getJWTCookies;
