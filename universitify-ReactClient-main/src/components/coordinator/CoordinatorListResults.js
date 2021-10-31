/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState } from 'react';
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
  Typography
} from '@material-ui/core';
import { getAllCoordinators } from 'src/API/coordinatorAPI';

// import getInitials from 'src/utils/getInitials';

const CoordinatorListResults = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [coordinators, setCoordinator] = useState([]);

  useEffect(() => {
    getAllCoordinators().then((coordinatorData) =>
      setCoordinator(coordinatorData)
    );
  }, []);
  console.log(coordinators);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const superVisorTableMetaData = ['Id', 'Academic Advisor name', 'email'];

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {superVisorTableMetaData.map((metaData) => (
                  <TableCell key={metaData}>{metaData}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {coordinators
                .slice(page === 0 ? 0 : limit * (page - 1), limit * page)
                .map((coordinatorData) => (
                  <TableRow hover key={coordinatorData.id}>
                    <TableCell>{coordinatorData.id}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {`${coordinatorData.fname} ${coordinatorData.lname}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{coordinatorData.email}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={coordinators.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default CoordinatorListResults;
