/* eslint-disable no-nested-ternary */
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import StudentList from 'src/pages/student/StudentList';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import CourseList from './pages/course/CourseList';
import EnrollmentList from './pages/enrollments/EnrollmentList';
import SupervisorList from './pages/supervisor/SupervisorList';
import AddCoursePage from './pages/course/AddCoursePage';
import CourseDetailsPage from './pages/course/CourseDetailsPage';
import PlanAheadPage from './pages/PlanAhead';
import SuperVisorAccount from './pages/supervisor/SuperVisorAccount';
import StudentEnrollmentList from './pages/enrollments/StudentEnrollmentsList';
import CourseRegistration from './pages/course/CourseRegistration';
import CourseFinished from './pages/course/CourseFinished';
import StudentAccount from './pages/student/StudentAccount';
import AddStudentPage from './pages/student/AddStudentPage';
import AddSuperVisorPage from './pages/supervisor/AddSuperVisorPage';
import StudentEnrolledCourses from './pages/enrollments/StudentEnrolledCourses';
import CoordinatorList from './pages/coordinator/CoordinatorList';
import CoordinatorAccount from './pages/coordinator/CoordinatorAccount';
import AddCoordinatorPage from './pages/coordinator/AddCoordinatorPage';
import SemesterList from './pages/semester/SemesterList';
import AddSemesterPage from './pages/semester/AddSemesterPage';
import StudentSemesterList from './pages/semester/StudentSemesterList';
import EditStudentPage from './pages/student/EditStudentPage';

// isSigned = true;
const routes = (user) => {
  console.log(user);
  return [
    {
      path: 'app',
      element: user ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        {
          path: 'student/:id/account',
          element: user ? <StudentAccount /> : <Navigate to="/login" />
        },
        {
          path: 'students',
          element: user ? <StudentList /> : <Navigate to="/login" />
        },
        {
          path: 'student/add',
          element: user ? <AddStudentPage /> : <Navigate to="/login" />
        },
        {
          path: 'student/:id/Courses',
          element: user ? <CourseFinished /> : <Navigate to="/login" />
        },
        {
          path: 'student/:id/enrollments',
          element: user ? <StudentEnrollmentList /> : <Navigate to="/login" />
        },
        {
          path: 'courses',
          element: user ? <CourseList /> : <Navigate to="/login" />
        },
        {
          path: 'student/:id/CurrentCourses',
          element: user ? <StudentEnrolledCourses /> : <Navigate to="/login" />
        },
        {
          path: 'course/add',
          element: user ? <AddCoursePage /> : <Navigate to="/login" />
        },
        {
          path: 'course/:id',
          element: user ? <CourseDetailsPage /> : <Navigate to="/login" />
        },
        {
          path: 'semester/:semesterId/registration',
          element: user ? <CourseRegistration /> : <Navigate to="/login" />
        },
        {
          path: '/semesters/registration',
          element: user ? <StudentSemesterList /> : <Navigate to="/login" />
        },

        {
          path: 'enrollments',
          element: user ? <EnrollmentList /> : <Navigate to="/login" />
        },

        {
          path: 'supervisor/:id/account',
          element: user ? <SuperVisorAccount /> : <Navigate to="/login" />
        },
        {
          path: 'supervisors',
          element: user ? <SupervisorList /> : <Navigate to="/login" />
        },
        {
          path: 'supervisor/add',
          element: user ? <AddSuperVisorPage /> : <Navigate to="/login" />
        },

        {
          path: 'coordinator/:id/account',
          element: user ? <CoordinatorAccount /> : <Navigate to="/login" />
        },
        {
          path: 'coordinators',
          element: user ? <CoordinatorList /> : <Navigate to="/login" />
        },
        {
          path: 'coordinator/add',
          element: user ? <AddCoordinatorPage /> : <Navigate to="/login" />
        },
        {
          path: 'semesters',
          element: user ? <SemesterList /> : <Navigate to="/login" />
        },
        {
          path: 'student/:id/edit',
          element: user ? <EditStudentPage /> : <Navigate to="/login" />
        },
        {
          path: 'semester/add',
          element: user ? <AddSemesterPage /> : <Navigate to="/login" />
        },
        {
          path: 'planahead',
          element: user ? <PlanAheadPage /> : <Navigate to="/login" />
        },

        { path: '*', element: <Navigate to="/login" /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        {
          path: '/',
          element: !user ? (
            <Navigate to="/login" />
          ) : user.role === 'student' ? (
            <Navigate to="app/student/:id/account" />
          ) : user.role === 'coordinator' ? (
            <Navigate to="app/coordinator/:id/account" />
          ) : (
            <Navigate to="app/supervisor/:id/account" />
          )
        },
        { path: '*', element: <Navigate to="/login" /> }
      ]
    }
  ];
};
export default routes;
