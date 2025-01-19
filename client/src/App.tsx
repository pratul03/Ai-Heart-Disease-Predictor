import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/ui/app-sidebar";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import { RecoilRoot } from "recoil";
import Meeting from "./pages/Meeting";
import Tools from "./pages/Tools";
import Doctors from "./pages/Doctors";
import HeartRiskPredictor from "./pages/HeartRiskPredictor";
import HeartRiskPredictorDemo from "./pages/HeartRiskPredictorDemo";

function LayoutWithSidebar({ children }: any) {
  return (
    <SidebarProvider >
      <AppSidebar />
      <main>
        <SidebarTrigger className="top-0 fixed"/>
        {children}
      </main>
    </SidebarProvider>
  );
}

function App() {
  return (
    <RecoilRoot>
    <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heart-disease-predictor" element={<HeartRiskPredictorDemo />} />
          <Route
            path="/dashboard"
            element={
              <LayoutWithSidebar>
                <Dashboard />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/meetings"
            element={
              <LayoutWithSidebar>
                <Meeting />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/tools"
            element={
              <LayoutWithSidebar>
                <Tools />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/tools/heart-disease-risk-predictor"
            element={
              <LayoutWithSidebar>
                <HeartRiskPredictor />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/doctors"
            element={
              <LayoutWithSidebar>
                <Doctors />
              </LayoutWithSidebar>
            }
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
