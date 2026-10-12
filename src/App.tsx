import { Outlet, createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Diagnostic } from "./pages/Diagnostic";
import { Home } from "./pages/Home";
import { Lesson } from "./pages/Lesson";
import { Lessons } from "./pages/Lessons";
import { NotFound } from "./pages/NotFound";
import { Practice } from "./pages/Practice";
import { ProgressPage } from "./pages/ProgressPage";
import { TestReview } from "./pages/TestReview";
import { Tests } from "./pages/Tests";
import { TestTake } from "./pages/TestTake";
import { AuthProvider } from "./state/auth";
import { PracticeProvider } from "./state/practice";
import { ProgressProvider } from "./state/progress";

/* PracticeProvider navigates when a set starts, so the providers sit inside the router. */
function Providers() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <PracticeProvider>
          <Outlet />
        </PracticeProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <Providers />,
    children: [{
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "diagnostic", element: <Diagnostic /> },
        { path: "diagnostic/practice", element: <Practice /> },
        { path: "lessons", element: <Lessons /> },
        { path: "lessons/:taskId", element: <Lesson /> },
        { path: "tests", element: <Tests /> },
        { path: "tests/take", element: <TestTake /> },
        { path: "tests/:testId/review", element: <TestReview /> },
        { path: "progress", element: <ProgressPage /> },
        { path: "*", element: <NotFound /> },
      ],
    }],
  },
], { basename: import.meta.env.BASE_URL.replace(/\/$/, "") });
