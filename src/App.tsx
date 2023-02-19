import { Button, MantineProvider, Text, Container } from '@mantine/core';
import Drawboard from './components/Drawboard';

export default function App() {
  const handleNotification = () => {
    let permissions = Notification.permission
    if (permissions !== "granted")
      Notification.requestPermission().then(e => {
        permissions = e
      })
    else {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        registrations[0].showNotification("hello", {
          body: "brother...."
        });
      });

    }
  }
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
        {/* <Drawboard /> */}

        <Button onClick={handleNotification} >Pop notification</Button>
      </Container>
    </MantineProvider>
  );
}
