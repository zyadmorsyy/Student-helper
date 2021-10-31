/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState, useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Button,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import {
  deleteEnrollment,
  getAllEnrollmentsByCourseId,
  UpdateEnrollment,
  EndEnrollment
} from 'src/API/enrollmentAPI';
import { InfoOutlined } from '@material-ui/icons';
import { createNotificationForStudent } from 'src/API/notificationAPI';
import { gpaConverter } from 'src/utils/gpa';

import { UserContext } from '../../API/auth';

const CourseEnrollmentListResult = (props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [enrollments, setEnrollments] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getAllEnrollmentsByCourseId(props.courseId).then((enrollmentsData) => {
      console.log(enrollmentsData);
      setEnrollments(
        enrollmentsData.enrollments.filter(
          (enrollment) => enrollment.status === 'enrolled'
        )
      );
    });
  }, []);
  const handleApprove = async (enrollmentData, enrollment) => {
    const updatedEnrollment = await UpdateEnrollment(
      enrollmentData.id,
      enrollment
    );
    await createNotificationForStudent(enrollmentData.student.id, {
      data: {
        title: 'enrollment approval',
        senderName: `DR. ${user.fname} ${user.lname}`,
        text: `updated your enrollment in course ${enrollmentData.course.name} `,
        subText: `enrollment current status: ${updatedEnrollment.status}`,
        avatar: user.avatar,
        senderEmail: user.email
      }
    });

    getAllEnrollmentsByCourseId(props.courseId).then((enrollmentsData) =>
      setEnrollments(enrollmentsData.enrollments)
    );
  };
  const handleDelete = async (enrollmentData) => {
    await deleteEnrollment(enrollmentData.id);
    await createNotificationForStudent(enrollmentData.student.id, {
      data: {
        title: 'enrollment approval',
        senderName: `DR. ${user.fname} ${user.lname}`,
        text: `deleted your enrollment in course ${enrollmentData.course.name}`,
        avatar: user.avatar,
        senderEmail: user.email
      }
    });

    getAllEnrollmentsByCourseId(props.courseId).then((enrollmentsData) =>
      setEnrollments(enrollmentsData.enrollments)
    );
  };
  const handleAddResult = async (enrollmentData, result) => {
    console.log(result);
    const grade = prompt('Enter Course result  in number from 0 to 100 : ');
    if (grade !== null && grade !== '' && grade >= 0 && grade <= 100) {
      await EndEnrollment(enrollmentData.id, { ...result, grade });
      await createNotificationForStudent(enrollmentData.student.id, {
        data: {
          title: 'course result',
          senderName: `DR. ${user.fname} ${user.lname}`,
          text: `added your result in course ${enrollmentData.course.name}`,
          subText: `your result is : ${gpaConverter(grade)}`,
          avatar: user.avatar,
          senderEmail: user.email
        }
      });

      getAllEnrollmentsByCourseId(props.courseId).then((enrollmentsData) =>
        setEnrollments(enrollmentsData.enrollments)
      );
    } else {
      alert('Faild : please enter Course result in numbers from 0 to 100');
    }
  };
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const enrollmentTableMetaData = [
    'enrollment date',
    'student ',
    'course  ',
    'last update at',
    'Academic Advisor',
    'status',
    'action'
  ];

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {enrollmentTableMetaData.map((metaData) => (
                  <TableCell key={metaData}>{metaData}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments
                .slice(page === 0 ? 0 : limit * (page - 1), limit * page)
                .map((enrollmentData) => (
                  <TableRow hover key={enrollmentData.id}>
                    <TableCell>
                      {enrollmentData.createdAt.toString().slice(0, 10)}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {`${enrollmentData.student.fname} ${enrollmentData.student.lname}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{enrollmentData.course.name}</TableCell>
                    <TableCell>
                      {enrollmentData.updatedAt.toString().slice(0, 10)}
                    </TableCell>
                    <TableCell>
                      {enrollmentData.supervisor
                        ? `DR. ${enrollmentData.supervisor.fname} ${enrollmentData.supervisor.lname}`
                        : 'Not Yet'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<InfoOutlined />}
                        label={enrollmentData.status}
                        clickable
                        color="default"
                        variant="outlined"
                      />
                    </TableCell>
                    {enrollmentData.status === 'in review' && (
                      <TableCell>
                        <Button
                          primary
                          variant="outlined"
                          onClick={() => {
                            handleApprove(enrollmentData, {
                              status: 'enrolled',
                              isAproved: true,
                              supervisorId: user.id
                            });
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={() => {
                            handleApprove(enrollmentData, {
                              status: 'rejected',
                              isAproved: false,
                              supervisorId: user.id
                            });
                          }}
                        >
                          reject
                        </Button>
                      </TableCell>
                    )}
                    {enrollmentData.status === 'rejected' && (
                      <TableCell>
                        <Button
                          primary
                          variant="outlined"
                          onClick={() => {
                            handleApprove(enrollmentData, {
                              status: 'in review',
                              isAproved: true,
                              supervisorId: user.id
                            });
                          }}
                        >
                          Undo
                        </Button>
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={() => {
                            handleDelete(enrollmentData);
                          }}
                        >
                          delete
                        </Button>
                      </TableCell>
                    )}
                    {enrollmentData.status === 'enrolled' && (
                      <TableCell>
                        <Button
                          primary
                          variant="outlined"
                          onClick={() => {
                            handleAddResult(enrollmentData, {
                              courseId: enrollmentData.course.id,
                              studentID: enrollmentData.student.id,
                              semesterId: enrollmentData.semesterId,
                              credit: enrollmentData.credit,
                              instructorId: enrollmentData.course.instructorId
                            });
                          }}
                        >
                          Add Result
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={enrollments.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default CourseEnrollmentListResult;
