import { Button, MantineProvider, Text, Container } from '@mantine/core';
import Drawboard from './components/Drawboard';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {/* <Container> */}
      <Drawboard />
      {/* </Container> */}
    </MantineProvider>
  );
}
