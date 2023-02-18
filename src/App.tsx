import styled from "@emotion/styled"
import { MantineProvider, Text } from '@mantine/core';
import Drawboard from './components/Drawboard';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Drawboard />
    </MantineProvider>
  );
}
const Container = styled.div`
   
`