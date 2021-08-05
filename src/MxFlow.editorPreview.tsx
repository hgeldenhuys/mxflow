import React, { Component, ReactNode } from "react";
import { MxFlowPreviewProps } from "../typings/MxFlowProps";

declare function require(name: string): string;

export class preview extends Component<MxFlowPreviewProps> {
    render(): ReactNode {
        return <div>No Preview</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/MxFlow.css");
}
