import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Login from "./Components/Login";
import StudentExamResult from "./Components/Student/ExamResult";
import StudentViewMaterial from "./Components/Student/ViewMaterial";
import StudentSubjectList from "./Components/Student/Subject";
import StudentProfile from "./Components/Student/Profile";
import StudentViewReport from "./Components/Student/ManageReport/ViewReport";
import StudentAddReport from "./Components/Student/ManageReport/AddReport";
import StudentListReport from "./Components/Student/ManageReport/ListReport";
import StudentNavBar from "./Components/Student/NavBar";
import TeacherSubjectList from "./Components/Teacher/SubjectList";
import TeacherProfile from "./Components/Teacher/Profile";
import TeacherNavBar from "./Components/Teacher/NavBar";
import TeacherAddResult from "./Components/Teacher/ManageExamResult/AddResult";
import TeacherListStudent from "./Components/Teacher/ManageExamResult/ListStudent";
import TeacherEditResult from "./Components/Teacher/ManageExamResult/EditResult";
import TeacherListResult from "./Components/Teacher/ManageExamResult/ListResult";
import TeacherAddMaterial from "./Components/Teacher/ManageMaterial/AddMaterial";
import TeacherViewMaterial from "./Components/Teacher/ManageMaterial/ViewMaterial";
import TeacherEditMaterial from "./Components/Teacher/ManageMaterial/EditMaterial";
import TeacherListMaterial from "./Components/Teacher/ManageMaterial/ListMaterial";
import TeacherSelectStudent from "./Components/Teacher/Reporting/SelectStudent";
import TeacherListReport from "./Components/Teacher/Reporting/ListReport";
import TeacherViewReport from "./Components/Teacher/Reporting/ViewReport";
import CompanySelectStudent from "./Components/Company/SelectStudent";
import CompanyListReport from "./Components/Company/ListReport";
import CompanyViewReport from "./Components/Company/ViewReport";
import CompanyNavBar from "./Components/Company/NavBar";
import CompanyProfile from "./Components/Company/Profile";
import AdminAddStudent from "./Components/Admin/ManageStudent/AddStudent";
import AdminViewStudent from "./Components/Admin/ManageStudent/ViewStudent";
import AdminEditStudent from "./Components/Admin/ManageStudent/EditStudent";
import AdminListStudent from "./Components/Admin/ManageStudent/ListStudent";
import AdminAddSubject from "./Components/Admin/ManageSubject/AddSubject";
import AdminViewSubject from "./Components/Admin/ManageSubject/ViewSubject";
import AdminEditSubject from "./Components/Admin/ManageSubject/EditSubject";
import AdminListSubject from "./Components/Admin/ManageSubject/ListSubject";
import AdminAddTeacher from "./Components/Admin/ManageTeacher/AddTeacher";
import AdminViewTeacher from "./Components/Admin/ManageTeacher/ViewTeacher";
import AdminEditTeacher from "./Components/Admin/ManageTeacher/EditTeacher";
import AdminListTeacher from "./Components/Admin/ManageTeacher/ListTeacher";
import AdminUpdateStudentReport from "./Components/Admin/Reporting/UpdateStudentReport";
import AdminViewStudentReport from "./Components/Admin/Reporting/ViewStudentReport";
import AdminListStudentReport from "./Components/Admin/Reporting/ListStudentReport";
import AdminSelectStudent from "./Components/Admin/Reporting/SelectStudent";
import AdminSelectTeacher from "./Components/Admin/Reporting/SelectTeacher";
import AdminSelectExternal from "./Components/Admin/Reporting/SelectExternal";
import AdminAddStudentReport from "./Components/Admin/Reporting/AddStudentReport";
import AdminNavBar from "./Components/Admin/ManageNavBar/NavBar";
import PageNotFound from "./PageNotFound";
import Forbidden from "./Forbidden";
import TeacherPrivateRoute from "./Utils/TeacherPrivateRoute";
import StudentPrivateRoute from "./Utils/StudentPrivateRoute";
import AdminPrivateRoute from "./Utils/AdminPrivateRoute";
import CompanyPrivateRoute from "./Utils/CompanyPrivateRoute";
import AuthRoute from "./Utils/AuthRoute";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {}
      <Router>
        <Switch>
          <Route
            exact
            path={[
              "/teacher/subjects",
              "/teacher/results",
              "/teacher/materials",
              "/teacher/results/add",
              "/teacher/results/edit/:id",
              "/teacher/results/:id",
              "/teacher/materials/add",
              "/teacher/materials/edit/:id",
              "/teacher/materials/:id",
              "/teacher",
              "/teacher/selectStudent",
              "/teacher/listReport/:id",
              "/teacher/viewreport/:id",
            ]}
          >
            <TeacherNavBar />
            <Switch>
              <TeacherPrivateRoute
                exact
                path="/teacher"
                component={TeacherProfile}
              />
              <TeacherPrivateRoute
                exact
                path="/teacher/results"
                component={TeacherListStudent}
              />
              <TeacherPrivateRoute
                exact
                path="/teacher/results/add"
                component={TeacherAddResult}
              />
              <TeacherPrivateRoute
                exact
                path="/teacher/results/edit/:id"
                component={TeacherEditResult}
              />
              <TeacherPrivateRoute
                exact
                path="/teacher/results/:id"
                component={TeacherListResult}
              />
              <TeacherPrivateRoute
                exact
                path="/teacher/materials"
                component={TeacherListMaterial}
              />
              <TeacherPrivateRoute
                exact
                path="/teacher/materials/add"
                component={TeacherAddMaterial}
              />
              <TeacherPrivateRoute
                exact
                path="/teacher/materials/edit/:id"
                component={TeacherEditMaterial}
              />
              <TeacherPrivateRoute
                exact
                path="/teacher/materials/:id"
                component={TeacherViewMaterial}
              />
              <TeacherPrivateRoute
                exact
                path="/teacher/subjects"
                component={TeacherSubjectList}
              />
              <TeacherPrivateRoute
                exact
                path="/teacher/selectStudent"
                component={TeacherSelectStudent}
              />
              <TeacherPrivateRoute
                exact
                path="/teacher/listReport/:id"
                component={TeacherListReport}
              />
              <TeacherPrivateRoute
                exact
                path="/teacher/viewreport/:id"
                component={TeacherViewReport}
              />
            </Switch>
          </Route>
          <Route
            exact
            path={[
              "/admin",
              "/admin/students",
              "/admin/students/add",
              "/admin/students/edit/:id",
              "/admin/students/:id",
              "/admin/subjects",
              "/admin/subjects/add",
              "/admin/subjects/edit/:id",
              "/admin/subjects/:id",
              "/admin/teachers",
              "/admin/teachers/add",
              "/admin/teachers/edit/:id",
              "/admin/teachers/:id",
              "/admin/selectStudent",
              "/admin/selectTeacher",
              "/admin/selectExternal",
              "/admin/addStudentReport",
              "/admin/listStudentReport",
              "/admin/viewStudentReport/:id",
              "/admin/updateStudentReport/:id",
            ]}
          >
            <AdminNavBar />
            <Switch>
              <AdminPrivateRoute
                exact
                path="/admin/students"
                component={AdminListStudent}
              />
              <AdminPrivateRoute
                exact
                path="/admin/students/add"
                component={AdminAddStudent}
              />
              <AdminPrivateRoute
                exact
                path="/admin/students/edit/:id"
                component={AdminEditStudent}
              />
              <AdminPrivateRoute
                exact
                path="/admin/students/:id"
                component={AdminViewStudent}
              />
              <AdminPrivateRoute
                exact
                path="/admin/subjects"
                component={AdminListSubject}
              />
              <AdminPrivateRoute
                exact
                path="/admin/subjects/add"
                component={AdminAddSubject}
              />
              <AdminPrivateRoute
                exact
                path="/admin/subjects/edit/:id"
                component={AdminEditSubject}
              />
              <AdminPrivateRoute
                exact
                path="/admin/subjects/:id"
                component={AdminViewSubject}
              />
              <AdminPrivateRoute
                exact
                path="/admin/teachers"
                component={AdminListTeacher}
              />
              <AdminPrivateRoute
                exact
                path="/admin/teachers/add"
                component={AdminAddTeacher}
              />
              <AdminPrivateRoute
                exact
                path="/admin/teachers/edit/:id"
                component={AdminEditTeacher}
              />
              <AdminPrivateRoute
                exact
                path="/admin/teachers/:id"
                component={AdminViewTeacher}
              />
              <AdminPrivateRoute
                exact
                path="/admin"
                component={AdminListStudent}
              />
              <AdminPrivateRoute
                exact
                path="/admin/listStudentReport"
                component={AdminListStudentReport}
              />
              <AdminPrivateRoute
                exact
                path="/admin/selectStudent"
                component={AdminSelectStudent}
              />
              <AdminPrivateRoute
                exact
                path="/admin/selectTeacher"
                component={AdminSelectTeacher}
              />
              <AdminPrivateRoute
                exact
                path="/admin/selectExternal"
                component={AdminSelectExternal}
              />
              <AdminPrivateRoute
                exact
                path="/admin/addStudentReport"
                component={AdminAddStudentReport}
              />
              <AdminPrivateRoute
                exact
                path="/admin/viewStudentReport/:id"
                component={AdminViewStudentReport}
              />
              <AdminPrivateRoute
                exact
                path="/admin/updateStudentReport/:id"
                component={AdminUpdateStudentReport}
              />
            </Switch>
          </Route>
          <Route
            exact
            path={[
              "/student/results",
              "/student/materials/:id",
              "/student/subjects",
              "/student/reports",
              "/student/addreport",
              "/student/viewreport/:id",
              "/student",
            ]}
          >
            <StudentNavBar />
            <Switch>
              <StudentPrivateRoute
                exact
                path="/student"
                component={StudentProfile}
              />
              <StudentPrivateRoute
                exact
                path="/student/results"
                component={StudentExamResult}
              />
              <StudentPrivateRoute
                exact
                path="/student/materials/:id"
                component={StudentViewMaterial}
              />
              <StudentPrivateRoute
                exact
                path="/student/subjects"
                component={StudentSubjectList}
              />
              <StudentPrivateRoute
                exact
                path="/student/reports"
                component={StudentListReport}
              />
              <StudentPrivateRoute
                exact
                path="/student/addreport"
                component={StudentAddReport}
              />
              <StudentPrivateRoute
                exact
                path="/student/viewreport/:id"
                component={StudentViewReport}
              />
            </Switch>
          </Route>
          <Route
            exact
            path={[
              "/company/students",
              "/company/student/reports/:id",
              "/company/student/viewreport/:id",
              "/company",
            ]}
          >
            <CompanyNavBar />
            <Switch>
              <CompanyPrivateRoute
                exact
                path="/company"
                component={CompanyProfile}
              />
              <CompanyPrivateRoute
                exact
                path="/company/students"
                component={CompanySelectStudent}
              />
              <CompanyPrivateRoute
                exact
                path="/company/student/reports/:id"
                component={CompanyListReport}
              />
              <CompanyPrivateRoute
                exact
                path="/company/student/viewreport/:id"
                component={CompanyViewReport}
              />
            </Switch>
          </Route>
          <Redirect exact from="/" to="/login" />
          <AuthRoute exact path="/login" component={Login} />
          <Route exact path="/forbidden" component={Forbidden} />
          <Route path="*" component={Forbidden} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
