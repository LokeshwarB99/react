import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setViewFalse, setUserDetails } from "../store/index";

const CourseInfo = () => {
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [liked, setLiked] = useState(false);
  const [completed, setCompleted] = useState(false);

  const toggleSyllabus = () => {
    setShowSyllabus(!showSyllabus);
  };

  const dispatch = useDispatch();
  const [courseDetail, updateCourseDetail] = useState("");
  const courseid = useSelector((state) => state.course); //
  const user = useSelector((state) => state.details); //
  const [lik, setlik] = useState(courseDetail.likes);
  const setstatus = (courseDetail) => {
    // alert(liked,enrolled)
    if (user.enrolled.split("\n").includes(courseDetail.course_name)) {
      setEnrolled(true);
    }
    if (user.liked.split("\n").includes(courseDetail.course_name)) {
      setLiked(true);
    }
    // alert(user.liked);
    if (user.completed.split("\n").includes(courseDetail.course_name)) {
      setCompleted(true);
      // document.getElementById("enrol").style.display = 'none';
    }
    setlik(courseDetail.likes);
  };

  const likeApi = () => {
    setlik(lik + 1);
    setLiked(true);
    axios
      .get(
        `http://localhost:5000/user/${user.id}/like/${courseDetail.course_name}`
      )
      .then((response) => {
        callApi();
      });
  };

  const enrollApi = () => {
    setEnrolled(true);
    axios
      .get(
        `http://localhost:5000/user/${user.id}/enroll/${courseDetail.course_name}`
      )
      .then((response) => {
        callApi();
      });
  };

  const completeApi = () => {
    setCompleted(true);
    axios
      .get(
        `http://localhost:5000/user/${user.id}/complete/${courseDetail.course_name}`
      )
      .then((response) => {
        callApi();
      });
  };

  const callApi = () => {
    axios
      .get(`http://localhost:5000/user/${user.id}/details`)
      .then((response) => {
        dispatch(setUserDetails(response.data));
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/course/${courseid}`).then((response) => {
      updateCourseDetail(response.data);
      setstatus(response.data);
    });
  }, []); // Add courseid as dependency

  return (
    <>
      <header className="pt-4 pl-4 align-middle justify-between flex">
        <span className="font-semibold text-xl">User: {user.name}</span>
        <button
          className="w-auto mr-4 bg-blue-700 text-white font-semibold p-2 px-3 rounded-full border-none"
          onClick={() => dispatch(setViewFalse())}
        >
          Go Back
        </button>
      </header>
      <article className="flex flex-wrap" data-theme="light">
        <div className="flex max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden w-full md:w-1/2 p-4 mt-10">
          <div className="p-4">
            <div className="flex justify-center">
              <img
                className="w-3/5"
                src={courseDetail.image}
                alt="course image"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {courseDetail.course_name}
            </h2>
            <p className="text-gray-600 mb-4">{courseDetail.description}</p>
            <div className="flex flex-wrap mb-4">
              <div className="w-full sm:w-1/2">
                <p>
                  <span className="font-semibold">Instructor:</span>{" "}
                  {courseDetail.instructor_name}
                </p>
                <p>
                  <span className="font-semibold">Enrollment Status:</span>{" "}
                  {courseDetail.enrollment_status}
                </p>
                <p>
                  <span className="font-semibold">Course Duration:</span>{" "}
                  {courseDetail.course_duration}
                </p>
                <p>
                  <span className="font-semibold">Pre-requisites:</span>{" "}
                  {courseDetail.prerequisites}
                </p>
              </div>
              <div className="w-full sm:w-1/2">
                <p>
                  <span className="font-semibold">Schedule:</span>{" "}
                  {courseDetail.schedule}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {courseDetail.location}
                </p>
              </div>
              <span className="font-semibold">Likes: {lik}</span>
            </div>
            <div>
              <div onClick={toggleSyllabus} className="cursor-pointer">
                <span className="font-bold text-lg">Syllabus</span>
                <span className="pl-2 font from-neutral-500 italic">
                  {showSyllabus ? "(Click to collapse)" : "(Click to expand)"}
                </span>
              </div>
              {showSyllabus && (
                <ul className="list-disc pl-4">
                  {courseDetail.syllabus.split("\n").map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              {completed ? (
                <div className="mt-5 font-semibold text-lg text-purple-600">
                  Course Completed Successfully !
                </div>
              ) : enrolled ? (
                <div>
                  <span className="font-semibold text-lg">Progress </span>
                  <div className="w-full rounded-full bg-black border border-black inline-block">
                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-2/6">
                      20%
                    </div>
                  </div>
                  <button
                    onClick={completeApi}
                    className="mt-5 w-auto bg-yellow-500 text-white font-semibold p-2 px-3 rounded-full border-none"
                  >
                    Mark as Completed
                  </button>
                  <div className="font-semibold text-lg mt-3">
                    Due date: 27/03/2024{" "}
                  </div>
                </div>
              ) : (
                <button
                  onClick={enrollApi}
                  className="mt-5 w-auto bg-blue-700 text-white font-semibold p-2 px-3 rounded-full border-none"
                >
                  Enroll Course
                </button>
              )}
              {liked ? (
                <>
                  <div className="mt-5">
                    <span className="font-semibold text-lg text-green-600">
                      Course Liked !
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <button
                      onClick={likeApi}
                      className="mt-5 w-auto bg-blue-700 text-white font-semibold p-2 px-3 rounded-full border-none"
                    >
                      Like Course
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default CourseInfo;
