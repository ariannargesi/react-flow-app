import { useCallback } from 'react'
import { applyNodeChanges, NodeChange, useStore } from 'reactflow'
import { useDispatch } from 'react-redux'
import { handleNodeChange } from '../../redux/reducer'

export default () => {
    const dispatch = useDispatch()

    let allNodes: any = useStore((state) => state.nodeInternals)
    allNodes = [...allNodes]
        .map(([name, value]) => ({ name, value }))
        .map((node) => node.value)
    const onNodeChange = useCallback(
        (changes: NodeChange[]) => {
            dispatch(handleNodeChange(applyNodeChanges(changes, allNodes)))
        },
        [allNodes]
    )
    return onNodeChange
}
