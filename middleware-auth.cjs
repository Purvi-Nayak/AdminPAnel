const fs = require("fs");
const path = require("path");
// In a real application, you'd use a library like 'jsonwebtoken' for JWT creation/verification
// For this example, we're using a hardcoded token and simple string comparisons for reset tokens.
// const jwt = require('jsonwebtoken'); // You'd install this: npm install jsonwebtoken

const dbFile = path.join(__dirname, "db.json");

// Helper function to read the database
const readDb = () => {
  try {
    return JSON.parse(fs.readFileSync(dbFile, "utf-8"));
  } catch (error) {
    console.error("Error reading db.json:", error);
    return { users: [] }; // Return a default structure if file is empty or invalid
  }
};

// Helper function to write to the database


module.exports = (req, res, next) => {
  // --- LOGIN Logic ---
  if (req.method === "POST" && req.url === "/login") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const db = readDb();
      const user = db.users.find(
        (u) => u.email === email && u.password === password // In real app, compare hashed passwords
      );

      if (user) {
        const { password, ...userWithoutPassword } = user; // Never send password to frontend

        // Hardcoded JWT for demonstration. In a real app, generate dynamically:
        // const token = jwt.sign({ userId: user.id, email: user.email, admin: user.admin }, 'your_secret_key', { expiresIn: '1h' });
        const hardcodedToken =
         "token"; // Added 'exp' for demo
        return res.status(200).json({
          message: "Login successful",
          token: hardcodedToken,
          user: userWithoutPassword,
        });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error in login middleware: ", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  
};
