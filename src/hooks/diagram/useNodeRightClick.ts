import { useCallback, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { updateSelectedElement } from '../../redux/reducer'
import { Node } from 'reactflow'

export default () => {
    const dispatch = useDispatch()
    const handleNodeRightClick = useCallback(
        (event: MouseEvent, node: Node<any>): void => {
            event.preventDefault()
            dispatch(updateSelectedElement(node.id))
        },
        [dispatch]
    )

    return handleNodeRightClick
}
