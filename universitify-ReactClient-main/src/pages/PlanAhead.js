/* eslint-disable object-curly-newline */
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Typography } from '@material-ui/core';

const PlanAheadPage = () => (
  <>
    <Helmet>
      <title>Plan ahead</title>
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
          <Grid item lg={8} md={6} xs={12}>
            <Typography variant="h2">Courses Tree</Typography>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <img
              src="/static/images/tree.jpg"
              alt="fue"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                display: 'block'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default PlanAheadPage;
