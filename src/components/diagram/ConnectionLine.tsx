
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getBezierPath, useStore } from 'reactflow'
import { makePortVisible, makePortInVisible } from '../../redux/reducer'

// @ts-ignore 
export default ({ fromX, fromY, fromPosition, toX, toY, toPosition }) => {
    const path = getBezierPath({
        sourceX: fromX,
        sourceY: fromY,
        targetX: toX,
        targetY: toY,
        sourcePosition: fromPosition,
        targetPosition: toPosition,
    })
    const internalsSymbol = Symbol.for('internals')
    const dispatch = useDispatch()

    let nodes: any = useStore((state) => state.nodeInternals)
    nodes = [...nodes]
        .map(([name, value]) => ({ name, value }))
        .map((node) => node.value)

    useEffect(() => {
        nodes.forEach((node: any) => {
            const bounds = node[internalsSymbol].handleBounds.source
            bounds.forEach((bound: any) => {
                const x = bound.x + node.positionAbsolute.x - toX
                const y = bound.y + node.positionAbsolute.y - toY
    
                let vx
                let vy
                if (x >= -50 && x <= 50) vx = true
    
                if (y >= -50 && y <= 50) vy = true
    
                const isNear = vx && vy
    
                if (isNear)
                    dispatch(makePortVisible({ node: node.id, port: bound.id }))
                else dispatch(makePortInVisible({ node: node.id, port: bound.id }))
            })
        })
    }, [toX, toY])

    

    return (
        <g>
            <path fill="none" stroke="gray" strokeWidth={3} d={path[0]} />
            <circle
                cx={toX}
                cy={toY}
                fill="#fff"
                r={3}
                stroke="gray"
                strokeWidth={1.5}
            />
        </g>
    )
}
