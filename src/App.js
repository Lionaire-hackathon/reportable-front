import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./routes/HomePage";
import EssayPage from "./routes/EssayPage";
import ReportPage from "./routes/ReportPage";
import SignUpPage from "./routes/SignUpPage";
import SignInPage from "./routes/SignInPage";
import MyPage from "./routes/MyPage";
import UserPage from "./routes/UserPage";
import EssayDetailPage from "./routes/EssayDetailPage";
import ReportDetailPage from "./routes/ReportDetailPage";
import ProfileEditPage from "./routes/ProfileEditPage";
import ServiceInfoPage from "./routes/ServiceInfoPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/essay" element={<EssayPage />} />
                    <Route path="/research" element={<ReportPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/user" element={<ProfileEditPage />} />
                    <Route
                        path="/essay/:documentId"
                        element={<EssayDetailPage />}
                    />
                    <Route
                        path="/research/:documentId"
                        element={<ReportDetailPage />}
                    />
                    <Route path="/service" element={<ServiceInfoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

/*
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./routes/HomePage";
import SignUpPage from "./routes/SignUpPage";
import SignInPage from "./routes/SignInPage";
import PostCreatePage from "./routes/PostCreatePage";
import PostDetailPage from "./routes/PostDetailPage";
import PostEditPage from "./routes/PostEditPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/create" element={<PostCreatePage />} />
          <Route path="/:postId" element={<PostDetailPage />} />
          <Route path="/:postId/edit" element={<PostEditPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
*/
