/* eslint-disable no-unused-vars */
import { Box, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../API/auth';

const StudentListToolbar = (props) => {
  const navigate = useNavigate();
  const handleAddButton = () => {
    navigate('/app/student/add');
  };
  const { user } = useContext(UserContext);

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        {user && user.role === 'coordinator' && (
          <Button color="primary" variant="contained" onClick={handleAddButton}>
            Add New
            <AddIcon />
          </Button>
        )}
      </Box>
      {/* <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search by student name"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box> */}
    </Box>
  );
};

export default StudentListToolbar;
