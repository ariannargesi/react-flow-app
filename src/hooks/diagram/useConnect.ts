import { Connection } from 'reactflow'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { createNewEdge } from '../../helpers/edge'
import { addEdge } from '../../redux/reducer'
import { useCallback } from 'react'

export default () => {
    const dispatch = useDispatch()
    const handleConnect = useCallback(
        (params: Connection): void => {
            const { source, target } = params
            if (source === target) return

            if (!source || !target) return

            const id = uuidv4()

            dispatch(addEdge(createNewEdge(params, id)))
        },
        [dispatch]
    )

    return handleConnect
}
