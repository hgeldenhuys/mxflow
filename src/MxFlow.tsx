import React, { Component, ReactNode } from "react";
import OverviewFlow, { JSONStorage } from "./components/OverviewFlow";
import { Edge, Node } from "react-flow-renderer/dist/types";
import { MxFlowContainerProps } from "../typings/MxFlowProps";

import "./ui/MxFlow.css";

export default class MxFlow extends Component<MxFlowContainerProps> {
    render(): ReactNode {
        const {
            jsonDataSource,
            nodes,
            edges,
            nodeLabel,
            edgeLabel,
            source,
            target,
            nodeId,
            edgeId,
            nodeClassName,
            edgeClassName
        } = this.props;
        const ready =
            jsonDataSource.status === "available" && nodes.status === "available" && nodes.status === "available";

        let json: JSONStorage = { edges: [], nodes: [] };
        try {
            json = JSON.parse(this.props.jsonDataSource.value + "");
        } catch (e) {}

        if (ready) {
            // Update and Add
            if (nodes.items)
                json.nodes = nodes.items.map(node => {
                    const id = nodeId(node).value + "-node";
                    const existingNode = json.nodes.find(n => n.id === id) as Node;
                    if (existingNode) {
                        existingNode.data = { label: nodeLabel(node).value };
                        return existingNode;
                    } else {
                        const newNode: Node = {
                            id,
                            data: { label: nodeLabel(node).value },
                            position: { x: 10, y: 10 },
                            className: nodeClassName?.(node).value
                        };
                        return newNode;
                    }
                });
            if (edges.items)
                json.edges = edges.items.map(edge => {
                    const id = edgeId(edge).value + "-edge";
                    const existingEdge = json.edges.find(n => n.id === id) as Edge;
                    if (existingEdge) {
                        existingEdge.label = edgeLabel(edge).value;
                        return existingEdge;
                    } else {
                        const newEdge: Edge = {
                            id,
                            label: edgeLabel(edge).value,
                            type: "Edge",
                            source: `${source(edge).value}-node`,
                            target: `${target(edge).value}-node`,
                            className: edgeClassName?.(edge).value
                        };
                        return newEdge;
                    }
                });
        }

        return <OverviewFlow {...this.props} json={json} />;
    }
}
