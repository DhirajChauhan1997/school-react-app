import { Grid, Paper, Typography } from "@mui/material";
import Layout from "../../layout/Layout";
import AverageScoreTable from "./components/AverageScoreTable";
import BottomScores from "./components/BottomScores";
import ClassAverageChart from "./components/ClassAverageChart";
import SortableStudentTable from "./components/SortableStudentTable";
import TopScores from "./components/TopScores";

const PrincipalDashboard = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Principal Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Average Score By Class
            </Typography>
            <AverageScoreTable />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top 3 Scores per Subject
            </Typography>
            <TopScores />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Bottom 3 Scores per Subject
            </Typography>
            <BottomScores />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sortable Student
            </Typography>
            <SortableStudentTable />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <ClassAverageChart />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default PrincipalDashboard;
