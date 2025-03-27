import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import { useAuth } from "../../context/AuthContext";
import ClassTeacher from "../../core/model/ClassTeacher";
import SubjectScore from "../../core/model/SubjectScore";
import Layout from "../../layout/Layout";
import { apiCall } from "../../utils/ApiCall";
import { isNetworkAvailable } from "../../utils/Utils";

const ChildDashboard: React.FC = () => {
  // You can replace this with API calls in a real project
  const [scores, setScores] = useState([]);
  const [teacher, setTeacher] = useState<ClassTeacher | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { user } = useAuth();
  const fetchScores = async () => {
    if (await isNetworkAvailable()) {
      var response = await apiCall(
        "http://192.168.159.81:8082/exam/getAllSubjectScoreByStudent/" +
          user?.id,
        "GET"
      );
      if (response && response.data) {
        // console.log(response);
        setScores(response.data);
      }
    } else {
      hideShowToastWithMsg(true, "No Internet connection");
    }
  };

  const fetchTeacher = async () => {
    if (await isNetworkAvailable()) {
      var response = await apiCall(
        "http://192.168.159.81:8084/classTeacher/getAllTeacherByClass/" +
          user?.classId,
        "GET"
      );
      if (response && response.data) {
        console.log(response);
        setTeacher(response.data[0]);
      }
    } else {
      hideShowToastWithMsg(true, "No Internet connection");
    }
  };

  const hideShowToastWithMsg = (isShow: boolean, message: string) => {
    setShowToast(isShow);
    setToastMessage(message);
  };

  useEffect(() => {
    fetchScores();
    fetchTeacher();
  }, []);

  return (
    <Layout>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Child Dashboard
        </Typography>

        {/* Scores Table */}
        <Typography variant="h6" gutterBottom>
          Scores in All Subjects
        </Typography>
        <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Exam</strong>
                </TableCell>
                <TableCell>
                  <strong>Subject</strong>
                </TableCell>
                <TableCell>
                  <strong>Obtain Score</strong>
                </TableCell>
                <TableCell>
                  <strong>Total Marks</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((row: SubjectScore, index) => (
                <TableRow key={index}>
                  <TableCell>{row.examName}</TableCell>
                  <TableCell>{row.subjectName}</TableCell>
                  <TableCell>{row.score}</TableCell>
                  <TableCell>{row.totalMarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Class Teacher Table */}
        <Typography variant="h6" gutterBottom>
          Class Teacher Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>{teacher?.teacherName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Class</strong>
                </TableCell>
                <TableCell>{teacher?.className}</TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>{teacher.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Phone</strong>
                </TableCell>
                <TableCell>{teacher.phone}</TableCell>
              </TableRow>
               */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Toast
        open={showToast}
        message={toastMessage}
        onClose={() => {
          setShowToast(false);
        }}
      />
    </Layout>
  );
};

export default ChildDashboard;
