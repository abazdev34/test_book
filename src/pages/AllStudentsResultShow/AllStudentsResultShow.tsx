import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllResults } from "../../redux/features/question/questionSlice";
import {
  groupResultsByStudent,
  formatTime,
  sortStudentResults,
  sortResultsByCorrectAnswersAndTime, // Import the new sorting function
} from "../admin/studentsResultsFunc";
import { IoPerson } from "react-icons/io5";
import { RxLapTimer } from "react-icons/rx";

const AllStudentsResultsShow = () => {
  const dispatch = useDispatch();
  const { allResults, loading, error } = useSelector((state) => state.questions);
  const [sortedResults, setSortedResults] = useState([]);
  const [sortBy, setSortBy] = useState("correctAndTime"); // New default sort

  useEffect(() => {
    dispatch(getAllResults());
  }, [dispatch]);

  useEffect(() => {
    if (allResults.items?.length > 0) {
      let sorted;
      if (sortBy === "correctAndTime") {
        sorted = sortResultsByCorrectAnswersAndTime(allResults.items);
      } else {
        const groupedResults = groupResultsByStudent(allResults.items);
        sorted = sortStudentResults(groupedResults, sortBy);
      }
      setSortedResults(sorted);
    }
  }, [allResults.items, sortBy]);

  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  if (loading) return <div className="text-center py-4">Жүктөлүүдө...</div>;
  if (error)
    return <div className="text-center py-4 text-red-600">Ката: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Окуучулардын жыйынтыктары
      </h2>
      <div className="mb-4">
        <button
          onClick={() => handleSort("correctAndTime")}
          className={`mr-2 px-3 py-1 rounded ${
            sortBy === "correctAndTime" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Туура жооптор жана убакыт
        </button>
        <button
          onClick={() => handleSort("name")}
          className={`mr-2 px-3 py-1 rounded ${
            sortBy === "name" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Аты-жөнү
        </button>
        {/* Add other sorting options as needed */}
      </div>
      {sortedResults.length > 0 ? (
        <ul className="space-y-4">
          {sortedResults.map((studentResult, index) => (
            <li
              key={studentResult.student_id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <strong className="text-[14px] sm:text-lg md:text-xl text-gray-800 flex items-center gap-2">
                  {index + 1}. <IoPerson />: {studentResult.student_name}
                </strong>
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <RxLapTimer />: {formatTime(studentResult.totalTime)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-green-500 font-bold mr-2">
                    {studentResult.correctAnswers}
                  </span>
                  <span className="text-sm text-gray-600">Туура жооптор</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 font-bold mr-2">
                    {studentResult.wrongAnswers}
                  </span>
                  <span className="text-sm text-gray-600">Ката жооптор</span>
                </div>
              </div>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${
                      (studentResult.correctAnswers /
                        (studentResult.correctAnswers +
                          studentResult.wrongAnswers)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">Жыйынтык табылган жок.</p>
      )}
    </div>
  );
};

export default AllStudentsResultsShow;