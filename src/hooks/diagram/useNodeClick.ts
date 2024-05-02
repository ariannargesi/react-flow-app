import { useCallback, MouseEvent } from 'react'
import { getConnectedEdges, Node } from 'reactflow'
import { useDispatch } from 'react-redux'
import { highlightEdges } from '../../redux/reducer'
import store from '../../redux/store'
export default () => {
    const dispatch = useDispatch()
    const handleNodeClick = useCallback(
        (_event: MouseEvent, node: Node<any>): void => {
            const diagram = store.getState().diagram
            const connectedEdges = getConnectedEdges([node], diagram.edges)
            dispatch(highlightEdges(connectedEdges))
        },
        [dispatch]
    )

    return handleNodeClick
}
