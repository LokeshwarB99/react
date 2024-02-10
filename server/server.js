const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./courses.db");
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// get all courses
app.get("/courses", (req, res) => {
  const query = `SELECT id, course_name as name, course_duration as duration, instructor_name as instructor, location, enrollment_status FROM courses`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error retrieving courses:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.json(rows);
  });
});

// get specific course
app.get("/course/:id", (req, res) => {
  const courseId = req.params.id;
  const query = `SELECT * FROM courses WHERE id = ?`;

  db.get(query, [courseId], (err, row) => {
    if (err) {
      console.error("Error retrieving course details:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    res.json(row);
  });
});

// Get all details of a specific student
app.get("/user/:id/details", (req, res) => {
  const studentId = req.params.id;
  const query = `SELECT * FROM students WHERE id = ?`;

  db.get(query, [studentId], (err, row) => {
    if (err) {
      console.error("Error retrieving student details:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    res.json(row);
  });
});


// Update the courses that a student liked
app.get("/user/:id/like/:name", (req, res) => {
  const studentId = req.params.id;
  const courseName = req.params.name;

  const query = `UPDATE students SET liked = liked || ? WHERE id = ?`;
  const queryCourse = `UPDATE courses SET likes = (likes + 1) WHERE course_name = ?`;

  db.run(query, [courseName + "\n", studentId], (err) => {
    if (err) {
      console.error("Error updating liked courses: 1", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  });

  db.run(queryCourse, [courseName], (err) => {
    if (err) {
      console.error("Error updating liked courses: 2", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  });
  res.json({ message: "Liked courses updated successfully" });
});

// enroll a student into a course
app.get("/user/:id/enroll/:name", (req, res) => {
  const studentId = req.params.id;
  const enrolledCourse = req.params.name;
  const query = `UPDATE students SET enrolled = enrolled || ? WHERE id = ?`;

  db.run(query, [enrolledCourse + "\n", studentId], (err) => {
    if (err) {
      console.error("Error updating enrolled courses:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.json({ message: "Enrolled courses updated successfully" });
  });
});

// Update the courses that a student completed
app.get("/user/:id/complete/:name", (req, res) => {
  const studentId = req.params.id;
  const completedCourses = req.params.name;

  const queryRemoveFromEnrolled = `UPDATE students SET enrolled = REPLACE(enrolled, ?, '') WHERE id = ?`;
  const queryAddToCompleted = `UPDATE students SET completed = completed || ? WHERE id = ?`;

  db.run(
    queryRemoveFromEnrolled,
    [completedCourses + "\n", studentId],
    (err) => {
      if (err) {
        console.error("Error removing course from enrolled:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      db.run(
        queryAddToCompleted,
        [completedCourses + "\n", studentId],
        (err) => {
          if (err) {
            console.error("Error updating completed courses:", err.message);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          res.json({ message: "Completed courses updated successfully" });
        }
      );
    }
  );
});

const PORT = 5000; // Specify the port number you want to use

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
