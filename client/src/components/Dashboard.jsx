import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  setCurrCourseView,
  setViewTrue,
  setDashTrue,
  setDashFalse,
} from "../store/index";

const Dashboard = () => {

  const user = useSelector((state) => state.details);
  const dispatch = useDispatch()
  const renderCourseList = (courseList) => {
    return courseList
      .split("\n")
      .filter((course) => course.trim() !== "")
      .map((course, index) => (
        <li key={index} className="text-gray-700">
          {course}
        </li>
      ));
  };

  return (
    <>
      <header className="pt-4 pl-4 align-middle justify-between flex">
        <span className="font-semibold text-xl">User: {user.name}</span>
        <button
          className="w-auto mr-4 bg-blue-700 text-white font-semibold p-2 px-3 rounded-full border-none"
          onClick={() => dispatch(setDashFalse())}
        >
          Go Back
        </button>
      </header>
      <article className="max-w-md mx-auto px-6 py-8 bg-white shadow-md rounded-lg">
        <h4 className="text-xl font-semibold mb-4 text-center">Dashboard</h4>
        <div className="mb-4">
          <h5 className="text-lg font-semibold mb-2">Name: {user.name}</h5>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="mb-8">
          <h5 className="text-lg font-semibold mb-2">Liked Courses:</h5>
          <ul className="list-disc pl-4">{renderCourseList(user.liked)}</ul>
        </div>
        <div className="mb-8">
          <h5 className="text-lg font-semibold mb-2">Completed Courses:</h5>
          <ul className="list-disc pl-4">{renderCourseList(user.completed)}</ul>
        </div>
        <div>
          <h5 className="text-lg font-semibold mb-2">Enrolled Courses:</h5>
          <ul className="list-disc pl-4">{renderCourseList(user.enrolled)}</ul>
        </div>
      </article>
    </>
  );
};

export default Dashboard;
