import { useDispatch } from 'react-redux'
import { setSelectedNodes } from '../../redux/reducer'
import { useCallback } from 'react'

import { Node } from '../../types'
import { OnSelectionChangeParams } from 'reactflow'
import { getIDs } from '../../helpers'

export default () => {
    const dispatch = useDispatch()

    const handleSelectionChange = useCallback(
        (value: OnSelectionChangeParams) => {
            const selectedNodes = value.nodes
            dispatch(setSelectedNodes(selectedNodes))
            const selectedElementID = getIDs(selectedNodes)
            const rootNodes: Node[] = []
            selectedNodes.forEach((node) => {
                if (selectedElementID.indexOf(node.parentNode!) === -1) {
                    rootNodes.push(node)
                }
            })
            dispatch(setSelectedNodes(rootNodes))
        },
        [dispatch]
    )
    return handleSelectionChange
}
