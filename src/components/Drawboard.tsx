import styled from "@emotion/styled";
import { ColorInput, ColorPicker, Input } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { MutableRefObject, useEffect, useRef, useState } from "react"

const Drawboard = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const contextRef = useRef() as MutableRefObject<CanvasRenderingContext2D>;
    const [isDrawing, setIsDrawing] = useState(false)
    const [colorValue, setColorValue] = useInputState("#000")
    const [paths, setPaths] = useState<Array<{ color: string, path: Path2D, width: number }>>([])
    const [strokeWidth, setStrokeWidth] = useInputState(10);

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
    }, [colorValue, strokeWidth])


    return (<>
        <Canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={finishDrawing} />
        <ColorPicker format="rgba" value={colorValue} onChange={setColorValue} />
        <Input value={strokeWidth} onChange={setStrokeWidth} />
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
