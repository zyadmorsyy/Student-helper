/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Button,
  Card,
  Chip,
  List,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  ListItem,
  Grid
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
  getAllCoursesByMajorAndLevel,
  getAllCoursesByMinorAndLevel
} from 'src/API/courseAPI';
import { courseType } from 'src/utils/courseUtils';
import { getStudent } from 'src/API/studentAPI';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { createNotificationForSupervisor } from 'src/API/notificationAPI';
import { createOne as createEnrollment } from '../../API/enrollmentAPI';
import { UserContext } from '../../API/auth';
import AlertDialog from '../AlertDialog';

const CourseRegistrationListResults = ({ ...props }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { semesterId } = useParams();
  useEffect(() => {
    if (user && user.role === 'student') {
      getStudent(user.id).then((userData) => {
        setUser({ role: 'student', ...userData });
      });
    }
  }, []);
  useEffect(async () => {
    if (user) {
      const majorAndGeneralCourses = await getAllCoursesByMajorAndLevel(
        user.major ? user.major.code : 0,
        props.level
      );
      const minorCourses = await getAllCoursesByMinorAndLevel(
        user.minor ? user.minor.code : 0,
        props.level
      );
      setCourses([...majorAndGeneralCourses, ...minorCourses]);
    }
  }, []);
  const isEligble = (loggeduser, inputCourse) =>
    loggeduser &&
    inputCourse.prerequisites
      .map((course) => course.id)
      .every((id) =>
        user.coursesFinished.map((course) => course.courseId).includes(id)
      );
  const isCourseTaken = (loggeduser, inputCourse) =>
    loggeduser &&
    user.coursesFinished.some((course) => course.courseId === inputCourse.id);

  const isPassed = (loggeduser, inputCourse) =>
    loggeduser &&
    user.coursesFinished.some(
      (course) => course.courseId === inputCourse.id && course.grade > 50
    );

  const handleEnroll = async (userId, courseId, courseName, credit) => {
    await createEnrollment({
      studentID: userId,
      courseID: courseId,
      semesterId,
      credit
    });
    await createNotificationForSupervisor(user.supervisorId, {
      data: {
        title: 'Enrollment Request',
        senderName: ` ${user.fname} ${user.lname}`,
        text: `requested new registration in course ${courseName} `,
        subText: 'need review',
        avatar: user.avatar,
        senderEmail: user.email
      }
    }).then((res) => console.log(res));
    if (user && user.role === 'student') {
      getStudent(user.id).then((userData) => {
        setUser({ role: 'student', ...userData });
      });
    }
  };
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const courseTableMetaData = [
    'courseCode',
    'Course title',
    'Credit',
    'Eligible',
    'prerequisites',
    'Enroll'
  ];

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {courseTableMetaData.map((metaData) => (
                  <TableCell key={metaData}>{metaData}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {courses
                // .slice(page === 0 ? 0 : limit * (page - 1), limit * page)
                .map(
                  (courseData) =>
                    !(
                      isCourseTaken(user, courseData) &&
                      isPassed(user, courseData)
                    ) && (
                      <TableRow hover key={courseData.id}>
                        <TableCell>{courseData.courseCode}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            <Typography color="textPrimary" variant="body1">
                              {courseData.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{courseData.credit}</TableCell>
                        <TableCell>
                          {isEligble(user, courseData) ? (
                            <Grid
                              container
                              flexDirection="column"
                              columnGap={1}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Chip
                                icon={<CheckCircleOutlineIcon />}
                                label="Eligible"
                                clickable
                                color="primary"
                                variant="outlined"
                              />
                              {courseData.major &&
                              user.major.code === courseData.major.code ? (
                                <>
                                  <Chip
                                    label={`Major : ${user.major.name}`}
                                    clickable
                                    color="primary"
                                    variant="outlined"
                                  />
                                  <Chip
                                    label={`type : ${courseType(
                                      courseData.type
                                    )}
                                    `}
                                    clickable
                                    color="default"
                                    variant="outlined"
                                  />
                                </>
                              ) : courseData.major &&
                                user.minor.code === courseData.major.code ? (
                                <Chip
                                  label={`Minor : ${courseData.major.name}`}
                                  clickable
                                  color="primary"
                                  variant="outlined"
                                />
                              ) : (
                                <Chip
                                  label={`type : ${courseType(courseData.type)}
                                `}
                                  clickable
                                  color="default"
                                  variant="outlined"
                                />
                              )}
                            </Grid>
                          ) : (
                            <Grid
                              container
                              flexDirection="column"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Chip
                                icon={<HighlightOffIcon />}
                                label="Not eligible"
                                clickable
                                color="secondary"
                                variant="outlined"
                              />
                              {courseData.major &&
                              user.major.code === courseData.major.code ? (
                                <>
                                  <Chip
                                    label={`Major : ${user.major.name}`}
                                    clickable
                                    color="primary"
                                    variant="outlined"
                                  />
                                  <Chip
                                    label={`type : ${courseType(
                                      courseData.type
                                    )}
                                    `}
                                    clickable
                                    color="default"
                                    variant="outlined"
                                  />
                                </>
                              ) : courseData.major &&
                                user.minor.code === courseData.major.code ? (
                                <Chip
                                  label={`Minor : ${courseData.major.name}`}
                                  clickable
                                  color="primary"
                                  variant="outlined"
                                />
                              ) : (
                                <Chip
                                  label={`type : ${courseType(courseData.type)}
                                `}
                                  clickable
                                  color="default"
                                  variant="outlined"
                                />
                              )}
                            </Grid>
                          )}
                        </TableCell>

                        <TableCell>
                          {isEligble(user, courseData) ? (
                            <AlertDialog
                              buttonText="show prerequisites"
                              title={`Course ${courseData.name} prerequisites :`}
                              color="primary"
                              data={
                                <List
                                  subheader="Prerequisites :"
                                  alignItems="flex-start"
                                >
                                  {courseData.prerequisites.map((course) => (
                                    <ListItem divider key={course.id}>
                                      {`Course : ${course.name} - level: ${course.level}`}
                                    </ListItem>
                                  ))}
                                </List>
                              }
                            />
                          ) : (
                            <AlertDialog
                              buttonText="show prerequisites"
                              title={`Course : ${courseData.name} `}
                              color="secondary"
                              data={
                                <List
                                  subheader="Prerequisites :"
                                  alignItems="flex-start"
                                >
                                  {courseData.prerequisites.map((course) => (
                                    <ListItem divider key={course.id}>
                                      {`Course : ${course.name} - level: ${course.level}`}
                                    </ListItem>
                                  ))}
                                </List>
                              }
                            />
                          )}
                        </TableCell>

                        <TableCell>
                          {isEligble(user, courseData) ? (
                            <Box color="secondary" variant="outlined">
                              {user.enrollments
                                .map((enrollment) => enrollment.courseID)
                                .includes(courseData.id) ? (
                                <Grid
                                  container
                                  flexDirection="column"
                                  spacing={1}
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Grid item>
                                    <Chip
                                      icon={<CheckCircleOutlineIcon />}
                                      label="currently enrolled"
                                      clickable
                                      color="primary"
                                      variant="outlined"
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Chip
                                      icon={<InfoOutlinedIcon />}
                                      label={
                                        user.enrollments.find(
                                          (enrollment) =>
                                            enrollment.courseID ===
                                            courseData.id
                                        ).status
                                      }
                                      clickable
                                      color="default"
                                      variant="outlined"
                                    />
                                  </Grid>
                                </Grid>
                              ) : (
                                <Button
                                  variant="outlined"
                                  onClick={() =>
                                    handleEnroll(
                                      user.id,
                                      courseData.id,
                                      courseData.name,
                                      courseData.credit
                                    )
                                  }
                                  disabled={
                                    props.creditHave < courseData.credit
                                  }
                                >
                                  Enroll
                                </Button>
                              )}
                            </Box>
                          ) : (
                            <Button primary disabled variant="outlined">
                              Enroll
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={courses.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default CourseRegistrationListResults;
