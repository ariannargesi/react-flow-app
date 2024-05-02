import { useCallback, DragEvent } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { getNodes } from '../../helpers'
import { assignParentToNode } from '../../helpers/dragDrop'
import { createLayout } from '../../helpers/elk'
import { handleNodeChange } from '../../redux/reducer'
import {
    AligningAlgorithm,
    Direction,
    Node,
    NodeType,
    StorageKey,
} from '../../types'

export default (reactFlowWrapper: any, reactFlowInstance: any) => {
    const dispatch = useDispatch()

    const handleDrop = useCallback(
        (event: DragEvent) => {
            event.preventDefault()
            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect()
            const nodeString = event.dataTransfer.getData(
                'application/reactflow'
            )

            let node
            try {
                node = JSON.parse(nodeString)
            } catch (error) {
                console.log(error)
            }
            if (typeof node === 'undefined' || !node) return

            const positionAbsolute = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            })

            node.positionAbsolute = positionAbsolute

            const data: any = {
                label: node.product || node.data.label,
                visiblePorts: [],
                property: {},
            }

            const style: any = {}

            if (node.type === NodeType.Group) {
                data.direction = Direction.Vertical
                style.border = '1px solid blue'
            } else if (node.type === NodeType.Component) {
                data.vendor = node.vendor
                
                data.key = node.key 
                
                data.thumbnail = node.thumbnail
            }

            const newNode: Node = {
                id: uuidv4(),
                type: node.type,
                positionAbsolute: node.positionAbsolute,
                position: node.positionAbsolute!,
                style,
                data,
            }

            const nodes: Node[] = getNodes()
            assignParentToNode(nodes, newNode)
            nodes.push(newNode)
            localStorage.setItem(StorageKey.Algorithm, AligningAlgorithm.Fixed)
            createLayout(nodes, (nodes) => {
                dispatch(handleNodeChange(nodes))
            })
        },
        [reactFlowInstance]
    )
    return handleDrop
}
