/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState, useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Chip,
  Button
} from '@material-ui/core';
import { createStudentSemester, getAllSemesters } from 'src/API/semesterAPI';
import { CheckCircleOutline } from '@material-ui/icons';
import { getStudent } from 'src/API/studentAPI';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../API/auth';

// import getInitials from 'src/utils/getInitials';

const StudentSemesterListResults = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [semesters, setsemesters] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(async () => {
    await getAllSemesters().then((semestersData) =>
      setsemesters(
        semestersData.filter((semester) => semester.status !== 'finished')
      )
    );
  });

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRegister = async (semesterId) => {
    await createStudentSemester({ studentId: user.id, semesterId });
    const updateUser = await getStudent(user.id);
    setUser(updateUser);
    navigate(`/app/semester/${semesterId}/registration`);
  };
  const semesterTableMetaData = ['semester', 'status', 'action'];

  const statusChip = (status) => {
    if (status === 'open') {
      return (
        <Chip
          icon={<CheckCircleOutline />}
          label="open for registration"
          color="primary"
          variant="outlined"
        />
      );
    }
    if (status === 'closed') {
      return (
        <Chip
          icon={<CheckCircleOutline />}
          label="registration closed"
          color="primary"
          variant="outlined"
        />
      );
    }
    if (status === 'current') {
      return (
        <Chip
          icon={<CheckCircleOutline />}
          label="current semester"
          color="primary"
          variant="outlined"
        />
      );
    }
    if (status === 'finished') {
      return (
        <Chip
          icon={<CheckCircleOutline />}
          label="finished"
          color="primary"
          variant="outlined"
        />
      );
    }
  };

  const actionsByStatus = (status, id) => {
    if (status === 'open') {
      return (
        <Button
          variant="outlined"
          onClick={() => {
            handleRegister(id);
          }}
        >
          Register
        </Button>
      );
    }
    if (status === 'closed') {
      return (
        <Chip
          icon={<CheckCircleOutline />}
          label="Registration closed"
          color="primary"
          variant="filled"
        />
      );
    }
    if (status === 'current') {
      return (
        <Chip
          icon={<CheckCircleOutline />}
          label="Registration closed"
          color="primary"
          variant="filled"
        />
      );
    }
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {semesterTableMetaData.map((metaData) => (
                  <TableCell key={metaData}>{metaData}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {semesters
                .slice(page === 0 ? 0 : limit * (page - 1), limit * page)
                .map((semesterData) => (
                  <TableRow hover key={semesterData.id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {`${semesterData.type} ${semesterData.year}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{statusChip(semesterData.status)}</TableCell>
                    <TableCell>
                      {actionsByStatus(semesterData.status, semesterData.id)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={semesters.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default StudentSemesterListResults;
