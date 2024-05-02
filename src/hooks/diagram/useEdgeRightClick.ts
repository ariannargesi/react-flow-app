import { useCallback, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import {
    updateSelectedElement,
} from '../../redux/reducer'
import { Edge } from '../../types'
export default () => {
    const dispatch = useDispatch()
    const handleEdgeRightClick = useCallback(
        (event: MouseEvent, edge: Edge) => {
            event.preventDefault()
            dispatch(updateSelectedElement(edge.id))
        },
        [dispatch]
    )
    return handleEdgeRightClick
}
