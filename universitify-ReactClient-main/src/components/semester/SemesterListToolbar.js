/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Button,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import typography from 'src/theme/typography';

const SemesterListToolbar = ({ enableAddSemester }) => {
  const navigate = useNavigate();
  const handleAddButton = () => {
    navigate('/app/semester/add');
  };
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          color="primary"
          disabled={!enableAddSemester}
          variant="contained"
          onClick={handleAddButton}
        >
          Add semester
          <AddIcon />
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <Typography variant="subtitle1">
                note : all semesters must be finished to add new semester
              </Typography>
              {/* <TextField
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
              placeholder="Search by supervisor name"
              variant="outlined"
            /> */}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SemesterListToolbar;
