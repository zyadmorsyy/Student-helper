import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import CoordinatorProfile from 'src/components/coordinator/coordinatorProfile/CoordinatorProfile';
import CoordinatorProfileDetails from 'src/components/coordinator/coordinatorProfile/CoordinatorProfileDetails';

const CoordinatorAccount = () => (
  <>
    <Helmet>
      <title>profile</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <CoordinatorProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <CoordinatorProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default CoordinatorAccount;
