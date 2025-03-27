import React, { useEffect, useState } from "react";

// import Pagination from "../../components/Pagination";
import { Box, Pagination, Typography } from "@mui/material";
import StudentScores from "../../components/StudentScores";
import { useAuth } from "../../context/AuthContext";
import StudentMarks from "../../core/model/StudentMarks";
import Layout from "../../layout/Layout";
import { apiCall } from "../../utils/ApiCall";

const ClassTeacherDashboard: React.FC = () => {
  const [students, setStudents] = useState<StudentMarks[] | any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(0);
  const studentsPerPage = 10;

  useEffect(() => {
    fetchStudentScores();
  }, []);

  const fetchStudentScores = async () => {
    try {
      var response = await apiCall(
        `http://192.168.159.81:8082/exam/getAllSubjectScoreByClassId/${user?.classId}/${currentPage}/${studentsPerPage}`,
        "GET"
      );
      if (response && response.data) {
        const studentWiseScoresMAp = response.data.reduce(
          (acc: any, result: any) => {
            const { studentId, studentName, subjectName, score, totalMarks } =
              result;

            if (!acc[studentId]) {
              acc[studentId] = { studentId, studentName, subjects: [] };
            }

            acc[studentId].subjects.push({ subjectName, score, totalMarks });

            return acc;
          },
          {}
        );

        const studentWiseScores = Object.values(studentWiseScoresMAp);

        console.log("studentWiseScores", studentWiseScores);

        setStudents(studentWiseScores);
      }
    } catch (err) {
      setError("Failed to fetch student scores.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get current students for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Layout>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Teacher Dashboard
        </Typography>

        {/* Scores Table */}
        <Typography variant="h6" gutterBottom>
          Scores in All Subjects
        </Typography>
        {/* Student Scores Component */}
        <StudentScores students={students} />

        {/* Pagination Component */}
        <Pagination
          count={Math.ceil(students.length / studentsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Layout>
  );
};

export default ClassTeacherDashboard;
