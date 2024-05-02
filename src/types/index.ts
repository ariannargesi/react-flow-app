import {
    Node,
    Edge,
    Rect,
    XYPosition,
    NodeProps,
    MarkerType,
    SelectionDragHandler,
} from 'reactflow'

export type { Node }
export type { Edge }
export type { Rect }
export type { XYPosition }
export type { MarkerType }
export type { NodeProps }
export type { SelectionDragHandler }

export interface ComponentData {
    label: string
    visiblePorts: string[]
    thumbnail: string
    key: string,  
    vendor: string, 
}

export interface GroupData {
    label: string
    visiblePorts: string[]
    direction?: Direction
}

export interface EdgeData {
    text?: string
}

export enum Direction {
    Vertical = 'verticacl',
    Horizontal = 'horizontal',
}

export interface Selection {}

export interface Diagram {
    nodes: Node<any>[]
    edges: Edge[]
}

export enum NodeType {
    Component = 'component',
    Group = 'group',
}

export interface RootState {
    diagram: Diagram
    sidebarIsVisible: boolean
    selectedNodes: Node[]
    selectedElementID: string | null
}

export enum Side {
    Left = 'left',
    Right = 'right',
    Top = 'top',
    Bottom = 'bottom',
}

export interface RelativeLocation {
    x: Side | null
    y: Side | null
}

export interface ComponentData {
    data: {
        label: string
        tags?: string[]
    }
}

export interface SelectionType {
    parentNode: string | undefined
    absolutePosition: XYPosition
}

export interface DroppableNode {
    type: NodeType
}

export enum AligningAlgorithm {
    Box = 'box',
    Fixed = 'fixed',
}

export enum StorageKey {
    Algorithm = 'alg',
}

export enum ElkKey {
    NodeSpacing = 'elk.spacing.nodeNode',
    Priority = 'elk.priority',
    Algorithm = 'elk.algorithm',
    AspectRatio = 'elk.aspectRatio',
    Padding = 'elk.padding',
}

