## university registration system

> this is the react app client for university registration system , in which students can register university moudules , track enrollments , and course result .

## technology stack

> nodeJs - React - MaterialUI - express

express server here :

## File Structure

Within the download you'll find the following directories and files:

```
university system folder structure
└── src
    ├── API
    │   ├── auth.js
    │   ├── courseAPI.js
    │   ├── enrollmentAPI.js
    │   ├── studentAPI.js
    │   └── superVisorAPI.js
    ├── App.js
    ├── components
    │   ├── AlertDialog.js
    │   ├── course
    │   │   ├── AddCourse.js
    │   │   ├── CourseDetails.js
    │   │   ├── CourseFinishedListResults.js
    │   │   ├── CourseListResult.js
    │   │   ├── courseListToolbar.js
    │   │   ├── CourseRegistrationListResults.js
    │   │   └── courseRegistrationListToolbar.js
    │   ├── dashboard
    │   │   ├── Budget.js
    │   │   ├── LatestOrders.js
    │   │   ├── LatestProducts.js
    │   │   ├── Sales.js
    │   │   ├── TasksProgress.js
    │   │   ├── TotalCustomers.js
    │   │   ├── TotalProfit.js
    │   │   └── TrafficByDevice.js
    │   ├── DashboardLayout.js
    │   ├── DashboardNavbar.js
    │   ├── DashboardSidebar.js
    │   ├── enrollment
    │   │   ├── CourseEnrollmentListResult.js
    │   │   ├── EnrollmentListResult.js
    │   │   ├── EnrollmentListToolbar.js
    │   │   └── StudentEnrollmentListResults.js
    │   ├── GlobalStyles.js
    │   ├── Header.js
    │   ├── Logo.js
    │   ├── MainLayout.js
    │   ├── MainNavbar.js
    │   ├── NavItem.js
    │   ├── settings
    │   │   ├── SettingsNotifications.js
    │   │   └── SettingsPassword.js
    │   ├── student
    │   │   ├── AddStudent.js
    │   │   ├── StudentListResults.js
    │   │   ├── StudentListToolbar.js
    │   │   └── studentprofile
    │   │       ├── StudentProfileDetails.js
    │   │       └── StudentProfile.js
    │   └── superVisor
    │       ├── AddSupervisor.js
    │       ├── SuperVisorListResults.js
    │       ├── SuperVisorListToolbar.js
    │       └── supervisorProfile
    │           ├── SuperVisorProfileDetails.js
    │           └── SuperVisorProfile.js
    ├── icons
    │   ├── Facebook.js
    │   └── Google.js
    ├── index.js
    ├── mixins
    │   └── chartjs.js
    ├── __mocks__
    │   ├── customers.js
    │   └── products.js
    ├── pages
    │   ├── course
    │   │   ├── AddCoursePage.js
    │   │   ├── CourseDetailsPage.js
    │   │   ├── CourseFinished.js
    │   │   ├── CourseList.js
    │   │   └── CourseRegistration.js
    │   ├── Dashboard.js
    │   ├── enrollments
    │   │   ├── EnrollmentList.js
    │   │   └── StudentEnrollmentsList.js
    │   ├── Login.js
    │   ├── NotFound.js
    │   ├── PlanAhead.js
    │   ├── Settings.js
    │   ├── student
    │   │   ├── AddStudentPage.js
    │   │   ├── StudentAccount.js
    │   │   └── StudentList.js
    │   └── supervisor
    │       ├── AddSuperVisorPage.js
    │       ├── SuperVisorAccount.js
    │       └── SupervisorList.js
    ├── routes.js
    ├── serviceWorker.js
    ├── theme
    │   ├── index.js
    │   ├── shadows.js
    │   └── typography.js
    └── utils
        └── getInitials.js
```

## Features :

- system has two main users : students and supervisors
- student can :
  1- register & enroll courses
  2-show result of finished courses
  3- show his current enrollments status
  4- show all prerequisites for any course
  5- student must complete all prerequisites courses before enroll to any course
  6- edit password
  -supervisors can :
  1- add students , courses , or other supervisors
  2- approve student enrollments .
  3- add result for student enrollments ( it will be shown as finished courses in student view)
  4- show enrollments by students or courses
  5- show all students and courses data
