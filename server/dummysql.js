const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./courses.db");

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY,
        course_name TEXT,
        instructor_name TEXT,
        description TEXT,
        enrollment_status TEXT,
        course_duration TEXT,
        schedule TEXT,
        location TEXT,
        prerequisites TEXT,
        syllabus TEXT,
        likes INTEGER,
        enrolled TEXT,
        image TEXT
    )
`;

const createStudentQuery = `CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    pass TEXT,
    liked TEXT,
    completed TEXT,
    enrolled TEXT
)`;

const dummycourse = `
INSERT INTO courses (course_name, instructor_name, description, enrollment_status, course_duration, schedule, location, prerequisites, syllabus, likes, enrolled, image)
VALUES
    ('JavaScript Basics', 'John Doe', 'Introduction to JavaScript programming language', 'Open', '8 weeks', 'Monday to Friday, 9am-12pm', 'Online', 'None', 'Week 1: Introduction to JavaScript\nWeek 2: Variables and Data Types\nWeek 3: Control Flow\nWeek 4: Functions\nWeek 5: Arrays\nWeek 6: Objects\nWeek 7: DOM Manipulation\nWeek 8: Asynchronous JavaScript\nWeek 9: Error Handling\nWeek 10: ES6 Features', 100, '1\n2\n3\n', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Javascript_badge.svg/1200px-Javascript_badge.svg.png'),
    ('React Fundamentals', 'Jane Smith', 'Fundamentals of React library for building user interfaces', 'Open', '10 weeks', 'Tuesday and Thursday, 6pm-8pm', 'In-person', 'JavaScript Basics\nHTML Basics\nCSS Basics\n', 'Week 1: Introduction to React\nWeek 2: Components and Props\nWeek 3: State and Lifecycle\nWeek 4: Events\nWeek 5: Forms\nWeek 6: Hooks\nWeek 7: Context API\nWeek 8: Routing\nWeek 9: Testing\nWeek 10: Deployment', 150, '2\n', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/1200px-React_Logo_SVG.svg.png'),
    ('Node.js Crash Course', 'Alex Johnson', 'Crash course on Node.js for server-side JavaScript development', 'Closed', '6 weeks', 'Weekends, 10am-4pm', 'In-person', 'JavaScript Basics\n', 'Week 1: Introduction to Node.js\nWeek 2: Express Framework\nWeek 3: Middleware\nWeek 4: RESTful APIs\nWeek 5: Authentication\nWeek 6: Authorization\nWeek 7: Error Handling\nWeek 8: Database Integration\nWeek 9: Testing\nWeek 10: Deployment', 80, '3\n', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png'),
    ('Python Programming', 'Emily Brown', 'Introduction to Python programming language', 'In Progress', '8 weeks', 'Monday and Wednesday, 7pm-9pm', 'Online', 'None', 'Week 1: Introduction to Python\nWeek 2: Data Structures\nWeek 3: Control Structures\nWeek 4: Functions\nWeek 5: File Handling\nWeek 6: Modules and Packages\nWeek 7: Error Handling\nWeek 8: Object-Oriented Programming\nWeek 9: Database Access\nWeek 10: Web Scraping', 120, '4\n', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png')
`;

const dummystudents = `INSERT INTO students (name, email, pass, liked, completed, enrolled) VALUES
    ('Student 1', 'student1@example.com', 'admin','JavaScript Basics\nReact Fundamentals\nNode.js Crash Course\n', 'JavaScript Basics\n', 'React Fundamentals\nNode.js Crash Course\n'),
    ('Student 2', 'student2@example.com', 'admin','React Fundamentals\n', '', 'JavaScript Basics\nReact Fundamentals\n'),
    ('Student 3', 'student3@example.com', 'admin','Node.js Crash Course\n', 'JavaScript Basics\n', 'Node.js Crash Course\n'),
    ('Student 4', 'student4@example.com', 'admin','JavaScript Basics\nReact Fundamentals\n', 'JavaScript Basics\n', 'Python Programming\n');
`;

// Execute the SQL query to create the table
db.run(createTableQuery, (err) => {
  if (err) {
    console.error("Error creating courses table:", err.message);
  }
});

db.run(createStudentQuery, (err) => {
  if (err) {
    console.error("Error creating courses table:", err.message);
  }
});

db.run(dummycourse, (err) => {
  if (err) {
    console.error("Error inserting data:", err.message);
  }
});

db.run(dummystudents, (err) => {
  if (err) {
    console.error("Error inserting data:", err.message);
  }
});
