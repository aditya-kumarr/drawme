import styled from "@emotion/styled";
import { ColorInput, ColorPicker } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { MutableRefObject, useEffect, useRef, useState } from "react"

const Drawboard = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const contextRef = useRef() as MutableRefObject<CanvasRenderingContext2D>;
    const [isDrawing, setIsDrawing] = useState(false)
    const [colorValue, setColorValue] = useInputState("#000")
    const [paths, setPaths] = useState<Array<{ color: string, path: Path2D }>>([])

    useEffect(() => {
        const canvas = canvasRef.current!
        canvas.width = 800
        canvas.height = 800
        canvas.style.height = `${400}px`
        canvas.style.width = `${400}px`
        canvas.style.border = "1px solid grey"
        canvas.style.margin = "1rem"
        const context = canvas.getContext("2d")!;
        context.lineWidth = 5
        context.scale(2, 2)
        context.lineCap = "round"
        contextRef.current = context
    }, [])

    const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { offsetX, offsetY } = nativeEvent;
        const path = new Path2D();
        path.moveTo(offsetX, offsetY)
        setPaths([...paths, { color: colorValue, path }])
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
        contextRef.current.strokeStyle = colorValue;
        contextRef.current.stroke(path)
        setPaths([...paths.slice(0, -1), { color: colorValue, path }])
    }

    useEffect(() => {
        contextRef.current.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        paths.forEach(({ color, path }) => {
            contextRef.current.strokeStyle = color;
            contextRef.current.stroke(path);
        })
    }, [colorValue])

    return (<>
        <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={finishDrawing} />
        <ColorPicker format="rgba" value={colorValue} onChange={setColorValue} />
    </>)
}

const Canvas = styled.canvas`
    

`

export default Drawboard
