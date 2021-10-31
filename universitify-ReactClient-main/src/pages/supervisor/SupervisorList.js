import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

import SuperVisorListToolbar from 'src/components/superVisor/SuperVisorListToolbar';
import SuperVisorListResults from 'src/components/superVisor/SuperVisorListResults';

const SupervisorList = () => (
  <>
    <Helmet>
      <title>Academic Advisor</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <SuperVisorListToolbar />
        <Box sx={{ pt: 3 }}>
          <SuperVisorListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default SupervisorList;
