import { useSelector, useDispatch } from "react-redux";
import { login, logout, setUserDetails } from "./store/index";
import CoursesDisplay from "./components/CoursesDisplay";
import Login from "./components/Login";
// import CourseDetails from "./components/CourseDetails";
import CourseInfo from "./components/CourseInfo";
import Dashboard from "./components/Dashboard";

function App() {
  const loginStatus = useSelector((state) => state.logged);
  const viewingCourse = useSelector((state) => state.viewing);
  const dash = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  return (
    <div className="App">
      {!loginStatus && <Login />}
      {loginStatus && !viewingCourse && !dash && <CoursesDisplay />}
      {loginStatus && viewingCourse && <CourseInfo />}
      {loginStatus && dash && <Dashboard />}
    </div>
  );
}

export default App;
