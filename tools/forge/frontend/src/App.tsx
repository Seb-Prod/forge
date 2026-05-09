import { Routes, Route } from "react-router-dom";
import { AppLayout, NotFoundPage, renderRoutes } from "@workspace/ui";
import { APP_ROUTES } from "./routes/routes.config";
import { AppHeader } from "./components/AppHeader";
import logo from "@/assets/logos/logo.png";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route
        element={
          <AppLayout routes={APP_ROUTES} logoSrc={logo} theme="forge">
            <AppHeader />
          </AppLayout>
        }
      >
         {renderRoutes(APP_ROUTES)}

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
