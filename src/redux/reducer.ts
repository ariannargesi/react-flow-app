import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, Side } from '../types'
import diagram from './reducers/diagram'
import { findNodeByID } from '../helpers'

const initialState: RootState = {
    diagram: {
        nodes: [
            
        ],
        edges: [],
    },
    sidebarIsVisible: true,
    selectedNodes: [],
    selectedElementID: null,
}

const state = createSlice({
    name: 'state',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarIsVisible = !state.sidebarIsVisible
        },
        makeAllPortsVisible: (state, action: PayloadAction<string>) => {
            const id = action.payload
            const node = findNodeByID(state.diagram.nodes, id)!
            node.data.visiblePorts = [
                id + '_' + Side.Left,
                id + '_' + Side.Bottom,
                id + '_' + Side.Right,
                id + '_' + Side.Top,
            ]
        },
        makeAllPortsInVisible: (
            state,
            action: PayloadAction<string | undefined>
        ) => {
            if (action.payload) {
                const node = findNodeByID(state.diagram.nodes, action.payload)!
                node.data.visiblePorts = []
            } else
                state.diagram.nodes.forEach((node) => {
                    node.data.visiblePorts = []
                })
        },
        makePortVisible: (
            state,
            action: PayloadAction<{ port: string; node: string }>
        ) => {
            const portID = action.payload.port
            const nodeID = action.payload.node

            state.diagram.nodes.forEach((node) => {
                if (node.id === nodeID)
                    if (node.data.visiblePorts.indexOf(portID) === -1)
                        node.data.visiblePorts.push(portID)
            })
        },
        makePortInVisible: (
            state,
            action: PayloadAction<{ port: string; node: string }>
        ) => {
            const portID = action.payload.port
            const nodeID = action.payload.node
            state.diagram.nodes.forEach((node) => {
                if (node.id === nodeID)
                    if (node.data.visiblePorts.indexOf(portID) > -1)
                        node.data.visiblePorts = node.data.visiblePorts.filter(
                            (port: string) => port != portID
                        )
            })
        },
        ...diagram,
    
    },
})

export const {
    setSelectedNodes,
    addEdge,
    updateSelectedElement,
    toggleSidebar,
    handleNodeChange,
    handleEdgeChange,
    highlightEdges,
    makeAllPortsVisible,
    makeAllPortsInVisible,
    makePortVisible,
    makePortInVisible,
} = state.actions
export default state.reducer
