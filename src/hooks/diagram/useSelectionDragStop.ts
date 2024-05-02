import { useCallback, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { XYPosition } from 'reactflow'
import { assignPositionInGroup, getIDs, getNodes, getStartEnd } from '../../helpers'
import { getTargetGroup } from '../../helpers/dragDrop'
import { createLayout } from '../../helpers/elk'
import { handleNodeChange } from '../../redux/reducer'
import { Node, NodeType } from '../../types'

export default () => {
    const dispatch = useDispatch()
    const handleSelectionDragStop = useCallback(
        (event: MouseEvent, selectedNodes: Node[]) => {
            const rootParent = selectedNodes[0].parentNode
            const rootGroups = selectedNodes.filter(node => node.parentNode == rootParent && node.type === NodeType.Group)

            rootGroups.forEach((group) => {
                let nodes = getNodes()
                const startEnd = getStartEnd(nodes, group)

                for(let c = 0;c<nodes.length; c++){
                    if(c>= startEnd.start && c<= startEnd.end){
                        const currentItem = nodes[c]
                        // @ts-ignore 
                        nodes[c] = undefined
                        nodes.push(currentItem) 
                    }
                }
                nodes = nodes.filter(node => node!= undefined)
                dispatch(handleNodeChange(nodes))
            })

            const stateNodes = getNodes()
            const target = event.target as HTMLDivElement
            const id = selectedNodes[0].id

            const selectionPosition: XYPosition = {
                x: target.offsetLeft,
                y: target.offsetTop,
            }

            const selection = {
                id,
                positionAbsolute: selectionPosition,
                data: {},
                position: selectionPosition,
            }

            const selectedNodesIDs = getIDs(selectedNodes)
            const nodes = stateNodes.filter((node) => {
                if (selectedNodesIDs.indexOf(node.id) === -1) return true
                else return false
            })

            const targetGroup = getTargetGroup(nodes, selection)

            if (!targetGroup) {
                stateNodes.map((node) => {
                    if (selectedNodesIDs.indexOf(node.id) != -1) {
                        node.parentNode = undefined
                        node.position = node.positionAbsolute!
                    }
                })
                createLayout(stateNodes, (data) => {
                    dispatch(handleNodeChange(data))
                })
                return
            }

            stateNodes.map((node) => {
                if (selectedNodesIDs.indexOf(node.id) != -1) {
                    node.parentNode = targetGroup.id
                    node.position = assignPositionInGroup(node, targetGroup)
                }
            })

            createLayout(stateNodes, (nodes) => {
                nodes.forEach(node => node.selected = false )
                dispatch(handleNodeChange(nodes))
            })
        },
        [dispatch]
    )

    return handleSelectionDragStop
}
