import { useCallback, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'

import { getTargetGroup } from '../../helpers/dragDrop'
import { AligningAlgorithm, Node, NodeType, StorageKey } from '../../types'
import { createLayout } from '../../helpers/elk'
import { handleNodeChange } from '../../redux/reducer'
import { assignPositionInGroup, getNodes, getStartEnd } from '../../helpers'
import store from '../../redux/store'

export default () => {
    const dispatch = useDispatch()
    const handleDragEnd = useCallback(
        (_event: MouseEvent, draggedNode: Node<any>) => {

            const className = (_event.target as Element).className
            if (className) {
                if (typeof className === 'object' && className !== null) {
                    return
                } else if (className.indexOf('MuiButtonBase-root') != -1) {
                    return
                }
            }

            if(draggedNode.type === NodeType.Group){
                let nodes = getNodes()
                const startAndEnd  = getStartEnd(nodes, draggedNode)
               
                for(let c = 0;c<nodes.length; c++){
                    if(c>= startAndEnd.start && c<= startAndEnd.end){
                        const currentItem = nodes[c]
                        // @ts-ignore 
                        nodes[c] = undefined
                        nodes.push(currentItem)
                    }
                }
                nodes = nodes.filter(node => node != undefined)
                dispatch(handleNodeChange(nodes))
            }

            localStorage.setItem(StorageKey.Algorithm, AligningAlgorithm.Fixed)
            const stateNodes: Node[] = store.getState().diagram.nodes
            let targetGroup = getTargetGroup(stateNodes, draggedNode)
            targetGroup = JSON.parse(JSON.stringify(targetGroup))

            if (!targetGroup && !draggedNode.parentNode) return
            /*
                info: 
                    if user moves a node inside a group, this would resizg the group 
                    by calling the elk algorithm with fixed algorithm 
            */ else if (
                targetGroup &&
                targetGroup.id === draggedNode.parentNode
            ) {
                localStorage.setItem(
                    StorageKey.Algorithm,
                    AligningAlgorithm.Fixed
                )
                createLayout(getNodes(), (nodes) => {
                    dispatch(handleNodeChange(nodes))
                })
                return
            } else {
                const nodes = getNodes()

                nodes.map((node) => {
                    if (node.id === draggedNode.id) {
                        node.parentNode = targetGroup
                            ? targetGroup.id
                            : undefined
                        if (targetGroup) {
                            node.position = assignPositionInGroup(
                                draggedNode,
                                targetGroup
                            )
                        }
                        // else >> user has dropped a node outside of groups
                        else node.position = draggedNode.positionAbsolute!
                    }
                })

                createLayout(nodes, (nodes) => {
                    dispatch(handleNodeChange(nodes))
                })
            }
        },
        [dispatch]
    )

    return handleDragEnd
}
