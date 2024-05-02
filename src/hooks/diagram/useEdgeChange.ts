import { useCallback } from 'react'
import { applyEdgeChanges, EdgeChange } from 'reactflow'
import { useDispatch } from 'react-redux'
import { handleEdgeChange } from '../../redux/reducer'
import store from '../../redux/store'

export default () => {
    const dispatch = useDispatch()
    const onEdgeChange = useCallback(
        (changes: EdgeChange[]) => {
            const edges = store.getState().diagram.edges
            dispatch(handleEdgeChange(applyEdgeChanges(changes, edges)))
        },
        [dispatch]
    )
    return onEdgeChange
}
