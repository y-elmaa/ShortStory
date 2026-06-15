import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import CreatePosts from "./pages/posts/CreatePost";
import UpdatePosts from "./pages/posts/UpdatePosts";
import LoggedUser from "./routes/LoggedUser";
import UnLoggedUser from "./routes/UnLoggedUser";
import ChekManager from "./routes/ChekManager";
import Dashboard from "./pages/dashboard/Dashboard";
import ShowFullPost from "./pages/ShowFullPost";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/register"
            element={
              <LoggedUser>
                <Register />
              </LoggedUser>
            }
          />
          <Route
            path="/login"
            element={
              <LoggedUser>
                <Login />
              </LoggedUser>
            }
          />
          <Route
            path="/create-post"
            element={
              <UnLoggedUser>
                <CreatePosts />
              </UnLoggedUser>
            }
          />
          <Route
            path="/update-post/:id"
            element={
              <UnLoggedUser>
                <UpdatePosts />
              </UnLoggedUser>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ChekManager>
                <Dashboard />
              </ChekManager>
            }
          />
          <Route path="/fullpost" element={<ShowFullPost/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
