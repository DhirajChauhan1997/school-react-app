import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StudentMarks from "../../../core/model/StudentMarks";
import { apiCall } from "../../../utils/ApiCall";

const SortableStudentTable = () => {
  const [order, setOrder] = useState<{ [key: string]: "asc" | "desc" }>({});
  const [students, setStudents] = useState<StudentMarks[] | any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(0);
  const studentsPerPage = 10;
  const fetchStudentScores = async () => {
    try {
      var response = await apiCall(
        `http://192.168.159.81:8082/exam/getAllSubjectScoreBySorting/asc/${currentPage}/${studentsPerPage}`,
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
  useEffect(() => {
    fetchStudentScores();
  }, []);

  const handleSort = (subject: string) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [subject]: prevOrder[subject] === "asc" ? "desc" : "asc",
    }));
  };

  const subjectNames = students.length
    ? students[0].subjects.map((subject: any) => subject.subjectName)
    : [];
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>ID</b>
            </TableCell>

            <TableCell>
              <b>Student Name</b>
            </TableCell>

            {subjectNames.map((subject: any) => (
              <TableCell key={subject}>
                <TableSortLabel
                  active={!!order[subject]}
                  direction={order[subject] || "asc"}
                  onClick={() => handleSort(subject)}
                >
                  <b>{subject}</b>
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...students]
            .sort((a, b) => {
              for (const subject of subjectNames) {
                if (order[subject]) {
                  return order[subject] === "asc"
                    ? (a.subjects[subject]?.score || 0) -
                        (b.subjects[subject]?.score || 0)
                    : (b.subjects[subject]?.score || 0) -
                        (a.subjects[subject]?.score || 0);
                }
              }
              return 0;
            })
            .map((student: any) => (
              <TableRow key={student.studentId}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.studentName}</TableCell>

                {student.subjects.map((subject: any, index: any) => (
                  <TableCell key={index}>{subject.score}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SortableStudentTable;
