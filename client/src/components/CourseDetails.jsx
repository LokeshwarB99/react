import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setViewFalse } from "../store/index";

const CourseDetails = () => {
  const courseid = useSelector((state) => state.course);
  const user = useSelector((state) => state.details);
  const [courseDetail, updateCourseDetail] = useState("");
  const dispatch = useDispatch();
  const [enrolled, setEnrolled] = useState(false);
  const [liked, setLiked] = useState(false);

  const likeapi = () => {
    if (liked) return;
    console.log(courseDetail.name);
    axios
      .get(`http://localhost:5000/user/${user.id}/like/${courseDetail.name}`)
      .then((response) => {
        setLiked(true);
        console.log(liked);
      });
  };

  const enrollapi = () => {
    axios
      .get(`http://localhost:5000/user/${user.id}/enroll/${courseDetail.name}`)
      .then((response) => {
        setEnrolled(true);
      });
  };

  useEffect(() => {
    if (user.enrolled.split("\n").includes(courseDetail.course_name)) {
      setEnrolled(true);
    }
    if (user.liked.split("\n").includes(courseDetail.course_name)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    // console.log(user.id, courseDetail.course_name);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/course/${courseid}`)
      .then((response) => {
        updateCourseDetail(response.data);
      })
      .catch((error) => console.error("Error fetching course details:", error));
  }, [liked, enrolled]);

  const [showSyllabus, setShowSyllabus] = useState(false);

  const toggleSyllabus = () => {
    setShowSyllabus(!showSyllabus);
  };

  return (
    <>
      <div className="pt-4 pl-4 align-middle justify-between flex">
        <span className="font-semibold text-xl">User: {user.name}</span>
        <button
          className="w-auto mr-4 bg-blue-700 text-white font-semibold p-2 px-3 rounded-full border-none"
          onClick={() => dispatch(setViewFalse())}
        >
          Go Back
        </button>
      </div>
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

            {enrolled ? (
              <div className="mt-5">
                <span className="text-xl font-semibold">Progress Bar:</span>
                <div className="flex justify-between items-center">
                  <div className="w-3/5 rounded-full bg-black border border-black">
                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-2/6">
                      {" "}
                      20%
                    </div>
                  </div>

                  <button
                    onClick={likeapi}
                    className="w-auto bg-green-700 text-white font-semibold p-2 px-3 rounded-full border-none"
                  >
                    Like Course
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={enrollapi}
                  className="mt-5 w-auto mr-4 bg-blue-700 text-white font-semibold p-2 px-3 rounded-full border-none"
                >
                  Enroll Course
                </button>
                {!liked ? (
                  <button
                    onClick={likeapi}
                    className="w-auto bg-green-700 text-white font-semibold p-2 px-3 rounded-full border-none"
                  >
                    Like Course
                  </button>
                ) : (
                  <button className="w-auto bg-green-700 text-white font-semibold p-2 px-3 rounded-full border-none">
                    Liked
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default CourseDetails;
