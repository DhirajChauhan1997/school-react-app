import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";
import { APIResponse } from "../core/model/apiResponse/ApiResponse";
import { ROUTES } from "../routes/Route";
import { apiCall, urlCallback } from "../utils/ApiCall";
import { APP_JWT_TOCKEN_KEY, APP_USER_KEY } from "../utils/Constants";
import { isNetworkAvailable, navigateTo } from "../utils/Utils";

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username) {
      setUsernameError(true);
      setError(true);
    } else if (!password) {
      setPasswordError(true);
      setError(true);
    } else {
      setError(false);
      setUsernameError(false);
      setPasswordError(false);
      onLoginHandler();
    }
  };
  const fetchTeacher = async (id: any) => {
    if (await isNetworkAvailable()) {
      var response = await apiCall(
        "http://192.168.159.81:8084/classTeacher/getAllClassByTeacherId/" + id,
        "GET"
      );
      if (response && response.data) {
        return response.data ? response.data : [];
      }
    } else {
      hideShowToastWithMsg(true, "No Internet connection");
    }
  };

  const onLoginHandler = async () => {
    if (await isNetworkAvailable()) {
      const bodyData = {
        username: username,
        password: password,
      };

      const successCallback = async (data: APIResponse<any>) => {
        if (data) {
          if (data.success) {
            var user = data.data;
            if (user.role === "CLASSTEACHER" || user.role === "TEACHER") {
              var teacherClasses = await fetchTeacher(user.id);
              user["schoolClass"] =
                teacherClasses && teacherClasses.length > 0
                  ? teacherClasses[0]
                  : null;
              user["classId"] =
                teacherClasses && teacherClasses.length > 0
                  ? teacherClasses[0].id
                  : null;
            }

            login(user);
            if (user.role === "PRINCIPAL") {
              navigateTo(navigate, ROUTES.PRINCIPAL_DASHBOARD, true);
            } else if (user.role === "TEACHER") {
              navigateTo(navigate, ROUTES.CLASS_TEACHER_DASHBOARD, true);
            } else {
              navigateTo(navigate, ROUTES.DASHBOARD, true);
            }
          } else {
            hideShowToastWithMsg(true, "Invalid username or password");
          }
        }
      };

      const failureCallback = (data: APIResponse<any>) => {
        if (data) {
          console.warn(data);
        }
      };

      urlCallback.UrlSyncPostCall(
        "http://192.168.159.81:8080/auth/login",
        bodyData,
        successCallback,
        failureCallback
      );
    } else {
      hideShowToastWithMsg(true, "No Internet connection");
    }
  };

  const hideShowToastWithMsg = (isShow: boolean, message: string) => {
    setShowToast(isShow);
    setToastMessage(message);
  };
  // const navigate = useNavigate();

  // Check localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem(APP_JWT_TOCKEN_KEY);

    if (token) {
      const userString = localStorage.getItem(APP_USER_KEY);
      if (userString) {
        const user1 = JSON.parse(userString);
        if (user1.role === "CLASSTEACHER" || user1.role === "TEACHER") {
          var teacherClasses: any = fetchTeacher(user1.id).then((teacher) => {
            if (teacher) {
              user1["schoolClass"] =
                teacher && teacher.length > 0 ? teacher[0] : null;
              user1["classId"] =
                teacher && teacher.length > 0 ? teacher[0].id : null;
              return teacher;
            }
            return [];
          });
        }

        login(user1);
        if (user1.role === "PRINCIPAL") {
          navigateTo(navigate, ROUTES.PRINCIPAL_DASHBOARD, true);
        } else if (user1.role === "TEACHER") {
          navigateTo(navigate, ROUTES.CLASS_TEACHER_DASHBOARD, true);
        } else {
          navigateTo(navigate, ROUTES.DASHBOARD, true);
        }
      }
    }
  }, []);

  return (
    <Container
      maxWidth="xs"
      style={{ marginTop: "50px", textAlign: "center", padding: "10%;" }}
    >
      <Card>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleLogin} style={{ display: "grid" }}>
          <FormControl sx={{ m: 3 }} error={error} variant="standard">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
            />
            {/* <FormHelperText>{errorText}</FormHelperText> */}

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
          </FormControl>
        </form>
      </Card>
      <Toast
        open={showToast}
        message={toastMessage}
        onClose={() => {
          setShowToast(false);
        }}
      />
    </Container>
  );
};

export default LoginPage;
