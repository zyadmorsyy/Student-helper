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
import AddIcon from '@material-ui/icons/Add';

const CourseRegistrationListToolbar = ({ ...props }) => (
  <Box {...props}>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <Typography variant="h3">{`Level : ${props.level}`}</Typography>
            <Typography variant="subtitle1">
              {`remaining credit hours : ${props.creditHave} credit hours`}
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

export default CourseRegistrationListToolbar;
