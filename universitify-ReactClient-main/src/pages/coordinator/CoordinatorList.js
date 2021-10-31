import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CoordinatorListToolbar from 'src/components/coordinator/CoordinatorListToolbar';
import CoordinatorListResults from 'src/components/coordinator/CoordinatorListResults';

const CoordinatorList = () => (
  <>
    <Helmet>
      <title>supervisors</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CoordinatorListToolbar />
        <Box sx={{ pt: 3 }}>
          <CoordinatorListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default CoordinatorList;
