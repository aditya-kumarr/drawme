import styled from "@emotion/styled";
import { Button, Container, Flex, Paper, Text } from "@mantine/core"
import { useFullscreen, useClipboard } from "@mantine/hooks"
const Dashboard = () => {
    const { toggle, fullscreen } = useFullscreen();
    const clipboard = useClipboard({ timeout: 500 });
    return (
        <Container size="lg">

        </Container>
    )
}
const container = styled.div`
    
`
export default Dashboard

