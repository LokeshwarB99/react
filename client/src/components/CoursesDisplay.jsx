import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  setCurrCourseView,
  setViewTrue,
  setDashTrue,
} from "../store/index";

const CoursesDisplay = () => {
  const [courseData, setCourseData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const userDetails = useSelector((state) => state.details);
  const dispatch = useDispatch();

  const handleCourseClick = (id) => {
    dispatch(setCurrCourseView(id));
    dispatch(setViewTrue());
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/courses")
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => console.error("Error fetching course details:", error));
  }, []);

  // Filter course data based on search query
  const filteredCourses =
    courseData &&
    courseData.filter((course) => {
      const courseName = course.name.toLowerCase();
      const query = searchQuery.toLowerCase();
      return courseName.includes(query);
    });

  return (
    <>
      <div className="pt-4 pl-4 justify-between flex">
        <span className="font-semibold text-xl line-">
          User: {userDetails.name}
        </span>
        <button
          className="w-auto mr-4 bg-red-700 text-white font-semibold py-2 px-3 rounded-full"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <article className="flex flex-wrap p-4">
        {filteredCourses &&
          filteredCourses.map((course, index) => (
            <div key={course.id} className="w-full md:w-1/2 p-4">
              <div className="rounded-lg shadow-lg">
                <div className="px-6 py-4">
                  <div className="mb-3">
                    <h5 className="text-xl font-semibold mb-2 text-black">
                      {course.name}
                    </h5>
                    <p className="text-sm">{course.duration}</p>
                  </div>
                  <p className="text-sm font-semibold text-black">
                    {course.instructor}
                  </p>
                  <p className="text-sm">{course.location}</p>
                  <div className="flex w-full justify-between items-center">
                    <a className="text-gray-600 rounded font-bold">
                      Enrollment Status : {course.enrollment_status}
                    </a>
                    <a
                      className="bg-blue-500 px-3 py-2 rounded-full text-white cursor-pointer"
                      onClick={() => handleCourseClick(course.id)}
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <button
          onClick={() => dispatch(setDashTrue())}
          className="bg-yellow-500 text-xl font-bold px-3 py-2 mx-4 rounded-full text-white cursor-pointer "
        >
          Go to Dashboard
        </button>
      </article>
    </>
  );
};

export default CoursesDisplay;
