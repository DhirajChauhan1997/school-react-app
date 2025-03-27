import { Container, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const ReportPage = () => {
  const { login } = useAuth();
  const handleLogin = () => {};

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h5">Report</Typography>
    </Container>
  );
};

export default ReportPage;
