const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  const githubAccessToken = req.header("github-access-token");

  // TODO find a good way to modify this middleware to check github access token
  if (githubAccessToken) {
    next();
    return;
  }

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorizaton denied" });

  try {
    // if (token) {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Add user from payload
    req.user = decoded;
    next();

    // } else if (githubAccessToken) {

    // const githubUserConfig = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + req.headers.access_token,
    //   },
    // };
    //get github user.
    // axios
    //   .get(`https://api.github.com/user`, githubUserConfig)
    //   .then((githubUserRes) => {
    //     req.user = decoded;
    //     next();
    //     if (githubUser) return res.json(githubUser);
    //     return res.json(githubUserRes.data);
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     return res.status(401).json({
    //       success: false,
    //       msg: err.body,
    //     });
    //   });
    // }
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
