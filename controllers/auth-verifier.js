const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: "https://dev-37549338.okta.com/oauth2/default", // Replace with your Okta domain
  clientId: "0oai9x9mzmN1h2AuZ5d7", // Replace with your Okta client ID
});

const authVerifier = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  const token = authHeader.match(/Bearer (.+)/);

  if (!token) {
    return res
      .status(401)
      .json({ error: "User is a not authenticated, no token passed" });
  }
  const accessToken = token[1];
  try {
    const jwt = await oktaJwtVerifier.verifyAccessToken(
      accessToken,
      "api://default"
    );
    console.log(jwt.claims);
    req.user = jwt.claims;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid, not authorised" });
  }
};

module.exports = { authVerifier };
