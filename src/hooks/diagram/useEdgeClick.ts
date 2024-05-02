import { useCallback, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { highlightEdges } from '../../redux/reducer'
import { Edge } from '../../types'

export default () => {
    const dispatch = useDispatch()
    const onEdgeClick = useCallback(
        (_event: MouseEvent, edge: Edge): void => {
            dispatch(highlightEdges([edge]))
        },
        [dispatch]
    )
    return onEdgeClick
}
