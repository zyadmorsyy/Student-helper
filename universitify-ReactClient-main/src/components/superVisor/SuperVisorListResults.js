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
import { getAllSuperVisors } from 'src/API/superVisorAPI';

// import getInitials from 'src/utils/getInitials';

const SuperVisorListResults = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [superVisors, setSuperVisors] = useState([
    {
      id: 1,
      createdAt: '2021-04-18T02:56:36.252Z',
      updatedAt: '2021-04-18T02:56:36.257Z',
      fname: 'Peggy',
      lname: 'Cummerata',
      gender: 'MALE',
      email: 'Cathryn_McLaughlin13@hotmail.com'
    }
  ]);

  useEffect(() => {
    getAllSuperVisors().then((superVisorsData) =>
      setSuperVisors(superVisorsData)
    );
  }, []);
  console.log(superVisors);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const superVisorTableMetaData = ['Id', 'Supervisor name', 'email'];

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
              {superVisors
                .slice(page === 0 ? 0 : limit * (page - 1), limit * page)
                .map((superVisorData) => (
                  <TableRow hover key={superVisorData.id}>
                    <TableCell>{superVisorData.id}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {`${superVisorData.fname} ${superVisorData.lname}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{superVisorData.email}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={superVisors.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default SuperVisorListResults;
