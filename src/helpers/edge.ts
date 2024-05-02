import { Connection, Edge, MarkerType } from 'reactflow'

export const createNewEdge = (
    params: Connection,
    id: string,
): Edge => {
    const { source, target, sourceHandle, targetHandle } = params

    return {
        id,
        source: source!,
        target: target!,
        sourceHandle,
        targetHandle,
        data: {
            property: {},
        },
        style: {
            stroke: 'green',
            strokeWidth: '3px',
            zIndex: 500,
        },
        markerEnd: {
            type: MarkerType.Arrow,
            color: 'green',
        },
    }
}

export const isEdgeDuplicate = (edges: Edge[], target: Edge): boolean => {
    let edge = edges.find((edge: Edge) => {
        const condition =
            edge.source === target.source && edge.target === target.target
        if (condition) return true
        return false
    })

    return edge ? true : false
}
