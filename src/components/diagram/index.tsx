import { useState, useRef, DragEventHandler, MouseEvent } from 'react'
import ReactFlow, {
    Background,
    ConnectionMode,
    Controls,
    NodeTypes,
    ReactFlowInstance,
} from 'reactflow'
import Component from './Component'
import Group from './Group'
import { useSelector } from 'react-redux'
import useNodeClick from '../../hooks/diagram/useNodeClick'
import useEdgeClick from '../../hooks/diagram/useEdgeClick'
import useNodeChange from '../../hooks/diagram/useNodeChange'
import useNodeRightClick from '../../hooks/diagram/useNodeRightClick'
import useEdgeChange from '../../hooks/diagram/useEdgeChange'
import useDragEnd from '../../hooks/diagram/useDragStop'
import useSelectionChange from '../../hooks/diagram/useSelectionChange'
import useConnect from '../../hooks/diagram/useConnect'
import useSelectionDragStop from '../../hooks/diagram/useSelectionDragStop'
import useDrop from '../../hooks/diagram/useDrop'
import useEdgeRightClick from '../../hooks/diagram/useEdgeRightClick'
import { RootState, Node } from '../../types'
import ConnectionLine from './ConnectionLine'
import {
    makeAllPortsInVisible,
    makeAllPortsVisible,
} from '../../redux/reducer'
import store from '../../redux/store'

const nodeTypes: NodeTypes = {
    component: Component,
    group: Group,
}

let connecting = false

const handleDragOver: DragEventHandler = (event) => {
    event.preventDefault()
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move'
}

const handleConnectStart = () => {
    connecting = true
}

const handleConnectEnd = () => {
    connecting = false
    store.dispatch(makeAllPortsInVisible())
}

const handleNodeMouseEnter = (_event: MouseEvent, node: Node) => {
    if (connecting === false) {
        store.dispatch(makeAllPortsVisible(node.id))
    }
}

const handleNodeMouseLeave = (_event: MouseEvent, node: Node) => {
    store.dispatch(makeAllPortsInVisible(node.id))
}

const Diagram = () => {
    const diagram = useSelector((state: RootState) => state.diagram)
    const [reactFlowInstance, setReactFlowInstance] =
        useState<ReactFlowInstance | null>(null)
    const reactFlowWrapper = useRef(null)
    const handleNodeClick = useNodeClick()
    const handleNodeRightClick = useNodeRightClick()
    const handleEdgeClick = useEdgeClick()
    const handleNodeChange = useNodeChange()
    const handleEdgeChange = useEdgeChange()
    const handleDragStop = useDragEnd()
    const handleSelectionChange = useSelectionChange()
    const handleDrop = useDrop(reactFlowWrapper, reactFlowInstance)
    const handleConnect = useConnect()
    const handleSelectionDragStop = useSelectionDragStop()
    const handleEdgeRightClick = useEdgeRightClick()
    // TODO better height for container to prevent overflow 
    return (
        <div style={{ width: '100%', flex: 1}} ref={reactFlowWrapper}>
            <ReactFlow
                nodes={diagram.nodes}
                edges={diagram.edges}
                nodeTypes={nodeTypes}
                onConnect={handleConnect}
                onNodesChange={handleNodeChange}
                onEdgesChange={handleEdgeChange}
                onDrop={handleDrop}
                onInit={setReactFlowInstance}
                connectionLineComponent={ConnectionLine}
                onNodeContextMenu={handleNodeRightClick}
                onSelectionChange={handleSelectionChange}
                onSelectionDragStop={handleSelectionDragStop}
                onNodeClick={handleNodeClick}
                onConnectStart={handleConnectStart}
                onConnectEnd={handleConnectEnd}
                onNodeMouseEnter={handleNodeMouseEnter}
                onNodeMouseLeave={handleNodeMouseLeave}
                onEdgeClick={handleEdgeClick}
                onEdgeContextMenu={handleEdgeRightClick}
                onDragOver={handleDragOver}
                onNodeDragStop={handleDragStop}
                connectionLineStyle={{ strokeWidth: '3px' }}
                connectionMode={ConnectionMode.Loose}
                defaultViewport={{
                    x: 128,
                    y: 128,
                    zoom: 1,
                }}
            >
                <Controls />

                <Background color={'black'} />
            </ReactFlow>
        </div>
    )
}

export default Diagram
