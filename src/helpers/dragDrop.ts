import { assignPositionInGroup, getRect } from '.'
import { NodeType, Node, GroupData } from '../types'

const removeInnerGroups = (list: (Node | undefined)[], id: string) => {
    const redundentGroups = list.filter((item) => {
        if (!item) return false
        return item.parentNode === id
    })

    list.forEach((item, index) => {
        if (item && item.parentNode === id) list[index] = undefined
    })

    redundentGroups.forEach((item) => {
        if (item) removeInnerGroups(list, item.id)
    })
}

const filterAllGroups = (nodes: Node[]): Node<GroupData>[] => {
    return nodes.filter((node) => node.type === NodeType.Group)
}

const getPossibleGroups = (nodes: Node[], draggedNode: Node): Node<any>[] => {
    let result: Node[]

    if (draggedNode.type === NodeType.Component) {
        result = filterAllGroups(nodes)
    } else {
        const nodesCopy = [...filterAllGroups(nodes)]
        removeInnerGroups(nodesCopy, draggedNode.id)
        let cleanedBoundaries = nodesCopy.filter((item) => item)
        result = cleanedBoundaries.filter((node) => node.id != draggedNode.id)
    }

    return result
}

const findTargetGroup = (
    groups: Node<GroupData>[],
    node: Node
): Node<GroupData> | undefined => {
    let targetGroup

    const nodeX = node.positionAbsolute!.x
    const nodeY = node.positionAbsolute!.y
    groups = groups.filter((group) => group.id != node.id).reverse()

    targetGroup = groups.find((group) => {
        const groupCoordinateData = getRect(group)
        const horizontal =
            nodeX >= groupCoordinateData.x &&
            nodeX <= groupCoordinateData.x + <number>groupCoordinateData.width
        const vertical =
            nodeY >= groupCoordinateData.y &&
            nodeY <= groupCoordinateData.y + <number>groupCoordinateData.height

        return horizontal && vertical
    })

    return targetGroup
}

export const getTargetGroup = (
    nodes: Node[],
    node: Node
): Node<GroupData> | null => {
    const possibleGroups: Node<GroupData>[] = getPossibleGroups(nodes, node)
    const targetGroup = findTargetGroup(possibleGroups, node)
    if (targetGroup) return targetGroup
    else return null
}

export const assignParentToNode = (nodes: Node[], node: Node) => {
    const groups = filterAllGroups(nodes)
    const targetGroup = findTargetGroup(groups, node)
    if (targetGroup) {
        node.parentNode = targetGroup.id

        const groupCoordinateData = getRect(targetGroup)

        if (targetGroup.positionAbsolute === undefined)
            targetGroup.positionAbsolute = {
                x: 0,
                y: 0,
            }
        targetGroup.positionAbsolute.x = groupCoordinateData.x
        targetGroup.positionAbsolute.y = groupCoordinateData.y

        node.position = assignPositionInGroup(node, targetGroup)
    } else {
        node.parentNode = undefined
    }
}
