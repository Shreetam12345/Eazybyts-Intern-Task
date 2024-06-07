import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pg from "pg";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
const saltRounds=10;

app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Eazybyts",
  password: "shreetam123",
  port: 5432,
});

db.connect();

// Middleware to serve static files from the 'Public' directory
app.use(express.static(join(__dirname, "Public")));

// Middleware to serve static files from the 'Register' directory
app.use(express.static(join(__dirname, "Register")));

// Middleware to serve static files from the 'Login  ' directory
app.use(express.static(join(__dirname, "Login")));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route to serve the home page
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "Public", "index.html"));
});

// Route to serve the registration page
app.get("/register", (req, res) => {
  res.sendFile(join(__dirname, "Register", "register.html"));
});

app.get("/login", (req, res) => {
  // Send the login.html file as the response
  res.sendFile(join(__dirname, "Login", "login.html"));
});



// Route to handle form submission
app.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE users = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send(`
      <script>
          alert("Email-Id already exists!Try logging In..");
          window.location.href = "/login.html";
      </script>
      `);
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          await db.query(
            "INSERT INTO users (users, password) VALUES ($1, $2)",
            [email, hash]
          );
        //   Send response to redirect to GitHub with an alert
        res.send(`
    <script>
        alert("Registration successful!");
        window.location.href = "https://github.com/Shreetam12345";
    </script>
    `);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }

});



app.post("/login", async (req, res) => {
  const email = req.body.email;
const loginPassword = req.body.password;
  try {
    const result = await db.query("SELECT * FROM users WHERE users = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      //verifying the password
      bcrypt.compare(loginPassword, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
            //   Send response to redirect to GitHub with an alert
        res.send(`
        <script>
            alert("Login successful!");
            window.location.href = "https://github.com/Shreetam12345";
        </script>
        `); 
          } else {
            res.send(`
            <script>
                alert("Incorrect Password!");
                window.location.href = "/login.html";
            </script>
            `);
          }
        }
      });
    } else {
      res.send(`
      <script>
          alert("User not found!Signup First..");
          window.location.href = "/register.html";
      </script>
      `);
    }
  } catch (err) {
    console.log(err);
  }

});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
