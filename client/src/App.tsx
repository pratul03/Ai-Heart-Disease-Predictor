import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/ui/app-sidebar";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import { RecoilRoot} from "recoil";
import Meeting from "./pages/Meeting";
import Tools from "./pages/Tools";
import Doctors from "./pages/Doctors";
import HeartRiskPredictor from "./pages/HeartRiskPredictor";
import HeartRiskPredictorDemo from "./pages/HeartRiskPredictorDemo";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import React from "react";
import AppSidebarD from "./components/custom/app-sidebar-doctor";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";
import ContactUs from "./components/custom/contact-us";

type LayoutWithSidebarProps = {
  children: React.ReactNode; 
};

function LayoutWithSidebar({ children }: LayoutWithSidebarProps) {
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
function LayoutWithSidebarForDoctor({ children }: LayoutWithSidebarProps) {
  return (
    <SidebarProvider >
      <AppSidebarD />
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
    <Toaster richColors/>
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
          <Route
            path="/contact-us"
            element={
              <LayoutWithSidebar>
                <ContactUs />
              </LayoutWithSidebar>
            }
          />
          <Route
            path={`/doctor-dashboard`}
            element={
              <LayoutWithSidebarForDoctor>
                <DoctorDashboard />
              </LayoutWithSidebarForDoctor>
            }
          />
          <Route
            path={`/doctor-appointments`}
            element={
              <LayoutWithSidebarForDoctor>
                <DoctorAppointment />
              </LayoutWithSidebarForDoctor>
            }
          />
          <Route
            path={`/contact-us-doctor`}
            element={
              <LayoutWithSidebarForDoctor>
                <ContactUs />
              </LayoutWithSidebarForDoctor>
            }
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
