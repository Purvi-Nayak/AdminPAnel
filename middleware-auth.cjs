const fs = require("fs");
const path = require("path");

const dbFile = path.join(__dirname, "db.json");

module.exports = (req, res, next) => {
  if (req.method === "POST" && req.url === "/login") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
      const user = db.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;

        return res.status(200).json({
          message: "Login successful",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
          user: userWithoutPassword,
        });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error in login middleware: ", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    next();
  }
};
