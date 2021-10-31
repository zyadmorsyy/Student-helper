/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useState } from 'react';
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
  Button,
  Grid
} from '@material-ui/core';
import {
  openRegistrationForSemester,
  endSemester,
  startSemester,
  closeRegistrationForSemester
} from 'src/API/semesterAPI';
import { CheckCircleOutline } from '@material-ui/icons';

// import getInitials from 'src/utils/getInitials';

const SemesterListResults = ({ UpdateSemestersData, semestersData }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const semesters = semestersData;

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
            closeRegistrationForSemester(id);
            UpdateSemestersData();
          }}
        >
          close registration
        </Button>
      );
    }
    if (status === 'closed') {
      return (
        <Grid
          container
          flexDirection="column"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => {
                openRegistrationForSemester(id);
                UpdateSemestersData();
              }}
            >
              Open Again
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={async () => {
                const res = await startSemester(id);
                if (res.error) alert(res.error);
                UpdateSemestersData();
              }}
            >
              start semester
            </Button>
          </Grid>
        </Grid>
      );
    }
    if (status === 'current') {
      return (
        <Button
          variant="outlined"
          onClick={async () => {
            const res = await endSemester(id);
            if (res.error) alert(res.error);
            UpdateSemestersData();
          }}
        >
          End semester
        </Button>
      );
    }
    if (status === 'finished') {
      return (
        <Chip
          icon={<CheckCircleOutline />}
          label="no action"
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

export default SemesterListResults;
