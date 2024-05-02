import ELK, { ElkNode } from 'elkjs'
import {
    Node,
    GroupData,
    ComponentData,
    Direction,
    NodeType,
    XYPosition,
    AligningAlgorithm,
    StorageKey,
    ElkKey,
} from '../types'
const elk = new ELK()

const hasInnerGroup = (
    groups: Node<GroupData>[],
    id: string
): Node<GroupData> | undefined => {
    return groups.find((group) => group.parentNode === id)
}

const assignXY = (nodes: Node[]) => {
    nodes.forEach((node) => {
        // @ts-ignore
        ;(node.x = node.position.x),
            // @ts-ignore
            (node.y = node.position.y)
    })
}

const getInnerGroups = (
    groups: Node<GroupData>[],
    id: string
): Node<GroupData>[] => {
    return groups.filter((group) => group.parentNode === id)
}

const generateLayoutOptions = (root: Node<GroupData>, priority: Number) => {
    const alg = localStorage.getItem(StorageKey.Algorithm)
    const options = {
        [ElkKey.NodeSpacing]: 64,
        [ElkKey.Algorithm]: alg,
        [ElkKey.Priority]: priority,
        [ElkKey.AspectRatio]:
            root.data.direction === Direction.Vertical ? 1 : 100,
        [ElkKey.Padding]: `[left=${
            alg === AligningAlgorithm.Box ? 32 : 16
        }, top=${alg === 'box' ? 64 : 0}, right=${
            alg === AligningAlgorithm.Box ? 32 : 16
        }, bottom=${64}]`,
    }
    return options
}

const getGroupComponents = (components: Node<ComponentData>[], id: string) => {
    return components.filter((component) => component.parentNode === id)
}

const assignSizeToEmptyBoundary = (node: Node<GroupData>) => {
    node.width = 128
    node.height = 128
}

const isArrayEmpty = (arr: any[]) => {
    return arr.length === 0
}

const create_nested_elk_children = (obj: any) => {
    const { roots, components, groups } = JSON.parse(JSON.stringify(obj))
    return roots.map((root: any, index: any) => {
        root.children = []
        const rootHasInnerGroup = hasInnerGroup(groups, root.id)
        if (rootHasInnerGroup) {
            const innerGroups = getInnerGroups(groups, root.id)
            root.children = create_nested_elk_children({
                roots: innerGroups,
                components,
                groups,
            })
        }

        root.layoutOptions = generateLayoutOptions(root, roots.length - index)

        const groupComponents = getGroupComponents(components, root.id).map(
            (component) => {
                component.width = 64
                component.height = 64
                const alg = localStorage.getItem(StorageKey.Algorithm)
                if (alg === AligningAlgorithm.Fixed) {
                    // @ts-ignore
                    component.x = component.position.x
                    // @ts-ignore
                    component.y = component.position.y
                }

                return component
            }
        )

        root.children = root.children.concat(groupComponents)

        if (isArrayEmpty(root.children)) assignSizeToEmptyBoundary(root)

        return root
    })
}

const findComponentWithNoParent = (components: Node<ComponentData>[]) => {
    return components.filter((component) => !component.parentNode)
}
const getRootNodes = (groups: Node[]) => {
    return groups.filter((group) => !group.parentNode)
}

const createLayout = (
    nodes: Node<any>[],
    callback: (nodes: Node[]) => void
) => {
    const components = nodes.filter((node) => node.type === NodeType.Component)
    const groups = nodes.filter((node) => node.type === NodeType.Group)

    if (localStorage.getItem(StorageKey.Algorithm) === AligningAlgorithm.Fixed)
        assignXY(groups)

    const rootGroups = getRootNodes(groups)

    let result = create_nested_elk_children({
        roots: rootGroups,
        components,
        groups,
    })

    let componentsWithoutParent = findComponentWithNoParent(components).map(
        (component) => {
            component.width = 64
            component.height = 64

            if (
                localStorage.getItem(StorageKey.Algorithm) ===
                AligningAlgorithm.Fixed
            ) {
                // @ts-ignore
                component.x = component.position.x
                // @ts-ignore
                component.y = component.position.y
            }
            return component
        }
    )

    let children = componentsWithoutParent.concat(result)

    children = children.map((node) => {
        return { ...node }
    })

    elk.layout({
        id: 'root',
        layoutOptions: {
            [ElkKey.Algorithm]: localStorage.getItem(StorageKey.Algorithm)!,
            [ElkKey.AspectRatio]: '10',
            [ElkKey.NodeSpacing]: '64',
        },
        // @ts-ignore
        children,
        edges: [],
    }).then((res) => {
        let nodes = [...extractNodes(res)]
        callback(nodes)
    })
}

const createReactFlowNode = (node: any): Node => {
    const position: XYPosition = {
        x: node.x,
        y: node.y,
    }
    const reactFlowNode: Node = {
        type: node.type,
        id: node.id,
        data: node.data,
        parentNode: node.parentNode,
        positionAbsolute: node.positionAbsolute,
        position: position,
        style: {
            ...node.style,
            width: node.width,
            height: node.height,
        },
        selected: node.selected,
    }
    return reactFlowNode
}

export const extractNodes = (node: ElkNode): Node[] => {
    const children = node.children
    if (children === undefined) return []
    const list: Node[] = []
    const recursive = (nodes: ElkNode[]) => {
        nodes.map((node: ElkNode) => {
            list.push(createReactFlowNode(node))
            if (node.children) recursive(node.children)
            delete node.children
        })
    }

    recursive(children)
    return list
}

export { createLayout }
