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
import HeartRiskPredictor from "./components/custom/heart-risk-predictor";
import Doctors from "./pages/Doctors";

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
