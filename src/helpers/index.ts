import { Edge, XYPosition, MarkerType, Rect } from 'reactflow'
import {
    NodeType,
    Node,
    GroupData,
    Direction,
} from '../types'
import store from '../redux/store'

export const findEdgeByID = (list: Edge[], id: string): Edge | undefined => {
    return list.find((edge) => edge.id === id)
}

export const findNodeByID = (
    nodes: Node<any>[],
    id: string
): Node<any> | undefined => {
    return nodes.find((item) => item.id === id)
}

export const assignPositionInGroup = (
    node: Node,
    group: Node<GroupData>
): XYPosition => {
    let x: number
    let y: number
    x = node.positionAbsolute!.x - group.positionAbsolute!.x
    y = node.positionAbsolute!.y - group.positionAbsolute!.y

    return {
        x,
        y,
    }
}

export const createNewGroup = (data: {
    width: number
    height: number
    id: string
    parent: string | undefined
    x: number
    y: number
}): Node<GroupData> => {
    const group: Node<GroupData> = {
        type: NodeType.Group,
        parentNode: data.parent,
        style: {
            width: data.width + 100,
            height: data.height + 100,
            border: '1px solid blue',
        },
        id: data.id,
        position: {
            x: data.x,
            y: data.y,
        },
        positionAbsolute: {
            x: data.x,
            y: data.y,
        },
        data: {
            label: 'New group',
            direction: Direction.Vertical,
            visiblePorts: [],
        },
    }
    return group
}

export const isValidNodeName = (value: string): boolean => {
    let pattern = /^[a-zA-Z0-9 ]*$/
    if (pattern.test(value) && value.length < 30) return true
    else return false
}

export const isValidFileName = (value: string): boolean => {
    let pattern = /^[a-zA-Z0-9 -]*$/
    if (pattern.test(value) && value.length < 30) return true
    else return false
}

export const isGroupingAllowed = (selectedNodes: Node[]): boolean => {
    let allowGrouping = false
    if (selectedNodes.length > 0) {
        const first = selectedNodes[0]
        allowGrouping = selectedNodes.every(
            (node) => node.parentNode === first.parentNode
        )
    }
    return allowGrouping
}

export const highlightEdges = (higlightableEdge: Edge[], edges: Edge[]) => {
    const edgesID = higlightableEdge.map((item) => item.id)

    edges.map((edge) => {
        edge.zIndex = 1000
        if (edge.style === undefined) edge.style = {}
        if (edgesID.indexOf(edge.id) !== -1) {
            edge.style.stroke = 'black'
            edge.markerEnd = {
                type: MarkerType.Arrow,
                color: 'black',
            }
        } else if (edge.style.stroke === 'black') {
            const Color = 'red'
            edge.style.stroke = Color
            edge.markerEnd = {
                type: MarkerType.Arrow,
                color: Color,
            }
        }
    })
}

export const findFirstAccure = (
    selectedNodes: Node[],
    nodes: Node[]
): number | undefined => {
    let firstAccur = undefined

    for (let c = 0; c < nodes.length; c++) {
        if (selectedNodes.map((item) => item.id).indexOf(nodes[c].id) != -1) {
            firstAccur = c
            break
        }
    }

    return firstAccur
}

export const getNodes = (): Node[] => {
    let nodes = store.getState().diagram.nodes
    nodes = JSON.parse(JSON.stringify(nodes))
    return nodes
}

export const hasProperty = (obj: any): boolean => {
    const keys = Object.keys(obj)
    let result = false
    for (let counter = 0; counter < keys.length; counter++) {
        let currentValue = obj[keys[counter]]
        if (Array.isArray(currentValue) && currentValue.length > 0) {
            result = true
            break
        } else if (
            Array.isArray(currentValue) === false &&
            typeof currentValue != 'object'
        ) {
            if (currentValue) {
                result = true
                break
            }
        } else {
            result = hasProperty(currentValue)
            if (result) {
                break
            }
        }
    }
    return result
}

export const getNewGroupRect = (selectedNodes: Node[]): Rect => {
    const farthestNodeInXAxis = selectedNodes.reduce((a, b) => {
        if (a.positionAbsolute!.x + a.width! > b.positionAbsolute!.x + b.width!)
            return a
        else return b
    })

    const nearestNodeInXAxis = selectedNodes.reduce((a, b) => {
        if (a.positionAbsolute!.x < b.positionAbsolute!.x) return a
        else return b
    })

    const farhestNodeInYAxis = selectedNodes.reduce((a, b) => {
        if (
            a.positionAbsolute!.y + a.height! >
            b.positionAbsolute!.y + b.height!
        )
            return a
        else return b
    })
    const nearestNodeInYAxis = selectedNodes.reduce((a, b) => {
        if (a.positionAbsolute!.y < b.positionAbsolute!.y) return a
        else return b
    })

    const newGropuWidht =
        farthestNodeInXAxis.positionAbsolute!.x +
        farthestNodeInXAxis.width! -
        nearestNodeInXAxis.positionAbsolute!.x

    const newGroupHeight =
        farhestNodeInYAxis.positionAbsolute!.y +
        farhestNodeInYAxis.height! -
        nearestNodeInYAxis.positionAbsolute!.y

    const newGroupY = nearestNodeInYAxis.positionAbsolute!.y
    const newGroupX = nearestNodeInXAxis.positionAbsolute!.x

    return {
        x: newGroupX,
        y: newGroupY,
        width: newGropuWidht,
        height: newGroupHeight,
    }
}

export const getRect = (node: Node): Rect => {
    const x = node.positionAbsolute!.x
    const y = node.positionAbsolute!.y
    const width = node.width || Number(node.style!.width)
    const height = node.height || Number(node.style!.height)

    return { x, y, width, height }
}

export const calculateRect = (nodes: Node[], node: Node): Rect => {
    let x = node.position.x
    let y = node.position.y
    const width = node.width || 100
    const height = node.height || 100

    if (!node.parentNode) return { x, y, width, height }

    if (node.parentNode) {
        const parent = findNodeByID(nodes, node.parentNode)!
        const nodeAbsolutePosition = calculateRect(nodes, parent)
        x += nodeAbsolutePosition.x
        y += nodeAbsolutePosition.y
    }

    return { x, y, width, height }
}

export const getIDs = (nodes: Node[]): string[] => {
    return nodes.map((node) => node.id)
}

export const isGroup = (type: NodeType) => type === NodeType.Group
export const isComponent = (type: NodeType) => type === NodeType.Component


export const xIsChildOfY = (nodes: Node[], x: Node, y: Node): boolean => {
    if (x.parentNode === y.id)
        return true
    else {
        if (x.parentNode === undefined)
            return false
        else {
            const parentNode = findNodeByID(nodes, x.parentNode)!
            return xIsChildOfY(nodes, parentNode, y)
        }
    }
}

export const getStartEnd = (nodes: Node[], group: Node<GroupData>) => {
    const indexOfDraggedNode = nodes.findIndex(node => node.id === group.id)
    let lastChildIndex: number | undefined
    nodes.forEach((node, index) => {
        if (lastChildIndex != undefined)
            return
        if (index > indexOfDraggedNode) {
            if (xIsChildOfY(nodes, node, group) === false)
                lastChildIndex = index - 1
        }
    })
    if (lastChildIndex === undefined)
        lastChildIndex = nodes.length - 1

    return {
        start: indexOfDraggedNode,
        end: lastChildIndex
    }
}