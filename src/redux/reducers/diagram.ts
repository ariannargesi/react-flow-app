import { PayloadAction } from '@reduxjs/toolkit'
import { RootState, Node, Edge } from '../../types'
import {
    isGroupingAllowed,
    highlightEdges as handleEdgeHighlighting,
} from '../../helpers'
import { isEdgeDuplicate } from '../../helpers/edge'

const setSelectedNodes = (state: RootState, action: PayloadAction<Node[]>) => {
    state.selectedNodes = action.payload
    const nodes: Node[] = state.diagram.nodes
    const allowGrouping = isGroupingAllowed(state.selectedNodes)
    if (allowGrouping === false)
        nodes.map((node) => {
            if (node.selected === true) node.selected = false
            return node
        })
    state.diagram.nodes = nodes
}

const addEdge = (state: RootState, action: PayloadAction<Edge>) => {
    const payload = action.payload
    const isDuplicate = isEdgeDuplicate(state.diagram.edges, payload)
    if (isDuplicate) alert('You already have this line')
    else {
        state.diagram.edges.push(payload)
    }
}

const handleNodeChange = (state: RootState, action: PayloadAction<Node[]>) => {
    state.diagram.nodes = action.payload
}
const handleEdgeChange = (state: RootState, action: PayloadAction<Edge[]>) => {
    state.diagram.edges = action.payload
}

const updateSelectedElement = (
    state: RootState,
    action: PayloadAction<string>
) => {
    state.selectedElementID = action.payload
}

const highlightEdges = (state: RootState, action: PayloadAction<Edge[]>) => {
    const payload = action.payload
    handleEdgeHighlighting(payload, state.diagram.edges)
}

const clearCanvas = (state: RootState) => {
    state.diagram.nodes = []
}

export default {
    setSelectedNodes,
    addEdge,
    handleNodeChange,
    handleEdgeChange,
    updateSelectedElement,
    highlightEdges,
    clearCanvas,
}
