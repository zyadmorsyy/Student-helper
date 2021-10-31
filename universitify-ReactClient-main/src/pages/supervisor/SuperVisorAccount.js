import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import SuperVisorProfile from 'src/components/superVisor/supervisorProfile/SuperVisorProfile';
import SuperVisorProfileDetails from 'src/components/superVisor/supervisorProfile/SuperVisorProfileDetails';

const SuperVisorAccount = () => (
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
            <SuperVisorProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <SuperVisorProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default SuperVisorAccount;
