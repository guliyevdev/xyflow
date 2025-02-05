import { memo } from 'react';
import { shallow } from 'zustand/shallow';

import { useVisibleNodeIds } from '../../hooks/useVisibleNodeIds';
import { useStore } from '../../hooks/useStore';
import { containerStyle } from '../../styles/utils';
import { GraphViewProps } from '../GraphView';
import { useResizeObserver } from './useResizeObserver';
import { NodeWrapper } from '../../components/NodeWrapper';
import type { Node, ReactFlowState } from '../../types';

export type NodeRendererProps<NodeType extends Node> = Pick<
  GraphViewProps<NodeType>,
  | 'onNodeClick'
  | 'onNodeDoubleClick'
  | 'onNodeMouseEnter'
  | 'onNodeMouseMove'
  | 'onNodeMouseLeave'
  | 'onNodeContextMenu'
  | 'onlyRenderVisibleElements'
  | 'noPanClassName'
  | 'noDragClassName'
  | 'rfId'
  | 'disableKeyboardA11y'
  | 'nodeExtent'
  | 'nodeTypes'
  | 'nodeClickDistance'
>;

const selector = (s: ReactFlowState) => ({
  nodesDraggable: s.nodesDraggable,
  nodesConnectable: s.nodesConnectable,
  nodesFocusable: s.nodesFocusable,
  elementsSelectable: s.elementsSelectable,
  onError: s.onError,
});

function NodeRendererComponent<NodeType extends Node>(props: NodeRendererProps<NodeType>) {
  const { nodesDraggable, nodesConnectable, nodesFocusable, elementsSelectable, onError } = useStore(selector, shallow);
  const nodeIds = useVisibleNodeIds(props.onlyRenderVisibleElements);
  const resizeObserver = useResizeObserver();
  return (
    <div className="react-flow__nodes" style={containerStyle}>
      {nodeIds.map((nodeId) => {
        return (
          <NodeWrapper<NodeType>
            key={nodeId}
            id={nodeId}
            nodeTypes={props.nodeTypes}
            nodeExtent={props.nodeExtent}
            onClick={props.onNodeClick}
            onMouseEnter={props.onNodeMouseEnter}
            onMouseMove={props.onNodeMouseMove}
            onMouseLeave={props.onNodeMouseLeave}
            onContextMenu={props.onNodeContextMenu}
            onDoubleClick={props.onNodeDoubleClick}
            noDragClassName={props.noDragClassName}
            noPanClassName={props.noPanClassName}
            rfId={props.rfId}
            disableKeyboardA11y={props.disableKeyboardA11y}
            resizeObserver={resizeObserver}
            nodesDraggable={nodesDraggable}
            nodesConnectable={nodesConnectable}
            nodesFocusable={nodesFocusable}
            elementsSelectable={elementsSelectable}
            nodeClickDistance={props.nodeClickDistance}
            onError={onError}
          />
        );
      })}
    </div>
  );
}

NodeRendererComponent.displayName = 'NodeRenderer';

export const NodeRenderer = memo(NodeRendererComponent) as typeof NodeRendererComponent;
