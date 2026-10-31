import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { isolateRefs } from '../lib/refs';

/**
 * isolateRefs applied to every string inside a rendered tree. The translated About,
 * dedication and book pages write references straight into their prose ("2:13; 6:4"),
 * which right-to-left text would otherwise display reordered ("4:6 ;13:2").
 */
export function isolateTree(node: ReactNode): ReactNode {
  if (typeof node === 'string') return isolateRefs(node);
  if (Array.isArray(node)) return Children.map(node, isolateTree);
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.props.children === undefined) return el;
    return cloneElement(el, undefined, Children.map(el.props.children, isolateTree));
  }
  return node;
}
