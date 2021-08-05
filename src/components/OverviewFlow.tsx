import React, { useRef, useState } from "react";
import ReactFlow, { MiniMap, Controls, Background, Elements } from "react-flow-renderer";
import { Edge, OnLoadParams, Node } from "react-flow-renderer/dist/types";
import { MxFlowContainerProps } from "../../typings/MxFlowProps";
import Big from "big.js";

const onLoad = (reactFlowInstance: OnLoadParams) => {
    console.log("flow loaded:", reactFlowInstance);
    reactFlowInstance.fitView();
};

export interface JSONStorage {
    nodes: Elements;
    edges: Elements;
}

interface OverviewFlowProps extends MxFlowContainerProps {
    json: JSONStorage;
}

function log(message1: any, message2?: any) {
    console.log("MxFlow1", message1, message2);
}

const OverviewFlow = (props: OverviewFlowProps) => {
    const {
        json,
        jsonDataSource,
        edgeClicked,
        nodeClicked,
        onEdgeClick,
        sourceId,
        targetId,
        onEdgeAdded,
        edgeId,
        nodeId,
        onNodeDoubleClick,
        gap,
        backgroundColor,
        controls,
        minimap
    } = props;
    const { nodes, edges } = json;
    const [elements, setElements] = useState([...nodes, ...edges]);
    const onElementsRemove = (elementsToRemove: Elements) => {
        console.log(elementsToRemove);
    };
    const onConnect = (params: Edge) => {
        const source = props.nodes.items?.find(n => params.source === nodeId(n).value + "-node");
        const target = props.nodes.items?.find(n => params.target === nodeId(n).value + "-node");
        // @ts-ignore
        if (source) sourceId.setValue(Big(nodeId(source).value + ""));
        // @ts-ignore
        if (target) targetId.setValue(Big(nodeId(target).value + ""));

        if (!onEdgeAdded?.isExecuting) onEdgeAdded?.execute();
    };
    React.useEffect(() => {
        log("Effect");
        setElements([...nodes, ...edges]);
    }, [nodes, edges]);
    log("rendering with", elements);
    const clickCount = useRef(0);
    return (
        <ReactFlow
            style={{ height: props.height }}
            deleteKeyCode={0}
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onLoad={onLoad}
            snapToGrid={true}
            snapGrid={[15, 15]}
            // @ts-ignore
            onElementClick={(evt, node) => {
                clickCount.current += 1;
                setTimeout(() => {
                    clickCount.current -= 1;
                }, 500);
                const clickedEdge = props.edges.items?.find(e => edgeId(e).value + "-edge" === node.id);
                const clickedNode = props.nodes.items?.find(e => nodeId(e).value + "-node" === node.id);
                if (clickedEdge) {
                    edgeClicked.setValue(Big(edgeId(clickedEdge).value + ""));
                    if (!onEdgeClick?.isExecuting) onEdgeClick?.execute();
                }
                if (clickedNode) {
                    nodeClicked.setValue(Big(nodeId(clickedNode).value + ""));
                    if (clickCount.current === 2 && !onNodeDoubleClick?.isExecuting) onNodeDoubleClick?.execute();
                }
            }}
            onNodeDragStop={(evt, node) => {
                log("drag");
                evt.preventDefault();
                jsonDataSource.setValue(
                    JSON.stringify({
                        nodes: nodes.map(n => (n.id === node.id ? node : n)),
                        edges
                    })
                );
            }}
        >
            {minimap ? (
                <MiniMap
                    nodeStrokeColor={(n: Node) =>
                        `${n.style?.background}`
                            ? `${n.style?.background}`
                            : n.type === "input"
                            ? "#0041d0"
                            : n.type === "output"
                            ? "#ff0072"
                            : n.type === "default"
                            ? "#1a192b"
                            : "#22737a"
                    }
                    nodeColor={n => {
                        if (n.style?.background) return `${n.style.background}`;
                        return "#22737a";
                    }}
                    nodeBorderRadius={2}
                />
            ) : null}
            {controls ? <Controls /> : null}
            <Background color={backgroundColor} gap={gap} />
        </ReactFlow>
    );
};
export default OverviewFlow;
