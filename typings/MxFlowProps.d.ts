/**
 * This file was generated from MxFlow.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export interface MxFlowContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    jsonDataSource: EditableValue<string>;
    sourceId: EditableValue<BigJs.Big>;
    targetId: EditableValue<BigJs.Big>;
    triggeredForGuid: EditableValue<string>;
    height: number;
    nodes: ListValue;
    nodeLabel: ListAttributeValue<string>;
    edges: ListValue;
    edgeLabel: ListAttributeValue<string>;
    source: ListAttributeValue<BigJs.Big>;
    target: ListAttributeValue<BigJs.Big>;
    nodeId: ListAttributeValue<BigJs.Big>;
    edgeId: ListAttributeValue<BigJs.Big>;
    onNodeDoubleClick?: ActionValue;
    nodeClicked: EditableValue<BigJs.Big>;
    onEdgeClick?: ActionValue;
    onEdgeAdded?: ActionValue;
    edgeClicked: EditableValue<BigJs.Big>;
    minimap: boolean;
    controls: boolean;
    backgroundColor: string;
    gap: number;
    nodeClassName?: ListAttributeValue<string>;
    edgeClassName?: ListAttributeValue<string>;
}

export interface MxFlowPreviewProps {
    class: string;
    style: string;
    jsonDataSource: string;
    sourceId: string;
    targetId: string;
    triggeredForGuid: string;
    height: number | null;
    nodes: {} | null;
    nodeLabel: string;
    edges: {} | null;
    edgeLabel: string;
    source: string;
    target: string;
    nodeId: string;
    edgeId: string;
    onNodeDoubleClick: {} | null;
    nodeClicked: string;
    onEdgeClick: {} | null;
    onEdgeAdded: {} | null;
    edgeClicked: string;
    minimap: boolean;
    controls: boolean;
    backgroundColor: string;
    gap: number | null;
    nodeClassName: string;
    edgeClassName: string;
}
