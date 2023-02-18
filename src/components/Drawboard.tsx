import styled from "@emotion/styled";
import { Button, ColorInput, ColorPicker, Container, Flex, Input, Paper, Slider } from "@mantine/core";
import { useInputState, useHotkeys, useScrollLock } from "@mantine/hooks";
import { MutableRefObject, useEffect, useRef, useState } from "react"

type Path = { color: string, path: Path2D, width: number }[]

const Drawboard = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const contextRef = useRef() as MutableRefObject<CanvasRenderingContext2D>;
    const [isDrawing, setIsDrawing] = useState(false)
    const [colorValue, setColorValue] = useInputState("#000")
    const [paths, setPaths] = useState<Path>([])
    const [strokeWidth, setStrokeWidth] = useState(4);
    useHotkeys([
        ['ctrl+Z', undo],
    ]);
    const [scrollLocked, setScrollLocked] = useScrollLock();

    useEffect(() => {
        const canvas = canvasRef.current!
        canvas.width = 800
        canvas.height = 800
        const context = canvas.getContext("2d")!;
        context.lineWidth = strokeWidth
        context.scale(2, 2)
        context.lineCap = "round"
        contextRef.current = context
    }, [])

    const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { offsetX, offsetY } = nativeEvent;
        const path = new Path2D();
        contextRef.current.strokeStyle = colorValue;
        contextRef.current.lineWidth = strokeWidth;
        setPaths([...paths, { color: colorValue, path, width: strokeWidth }])
        path.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const finishDrawing = () => {
        setIsDrawing(false)
    }

    const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!isDrawing) return
        const { offsetX, offsetY } = nativeEvent;
        console.log(offsetX, offsetY)
        const path = paths[paths.length - 1].path;
        path.lineTo(offsetX, offsetY)
        contextRef.current.stroke(path)
        setPaths([...paths.slice(0, -1), { color: colorValue, path, width: strokeWidth }])
    }

    useEffect(() => {
        contextRef.current.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        paths.forEach(({ color, path, width }) => {
            contextRef.current.strokeStyle = color;
            contextRef.current.lineWidth = width
            contextRef.current.stroke(path);
        })
    }, [colorValue, strokeWidth, paths])

    function undo() {
        setPaths((prev: Path) => {
            return prev.filter((path, i, array) => i !== array.length - 1)
        })
    }
    function downloadImage() {
        var link = document.createElement('a');
        link.download = 'filename.png';
        link.href = canvasRef.current?.toDataURL()!
        link.click();
    }
    function clear() {
        setPaths([])
    }


    return (<>
        <Container pt="lg">
            <Flex direction={window.innerWidth > 786 ? "row" : "column"} gap="lg">
                <Canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={finishDrawing} />
                <Paper component={Flex} direction="column" gap="lg" justify="center" align="center" >
                    <ColorPicker format="rgba" value={colorValue} onChange={setColorValue} />
                    <Slider w={"100%"} value={strokeWidth} onChange={setStrokeWidth} />
                    <Paper component={Flex} gap="lg" shadow="lg" p="lg">
                        <Button w={100} onClick={undo}>Undo</Button>
                        <Button onClick={clear}>clear</Button>
                        <Button onClick={downloadImage}>Download</Button>
                    </Paper>
                </Paper>
            </Flex>
        </Container>
    </>)
}

const Canvas = styled.canvas`
    border:1px solid gray;
    /* cursor:url("https://yt3.ggpht.com/ytc/AL5GRJUWLlTSCLw1EsLDtLTTZNWeAzV3HJWEKNUYXTd9Nw=s88-c-k-c0x00ffffff-no-rj"),auto; */
    cursor:pointer;
    width:400px;
    height:400px;

`

export default Drawboard
