import type React from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

export interface ICommonProps<T = unknown> {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<T>;
  type?: 'submit' | 'reset' | 'button' | undefined;
  htmlFor?: string;
  onMouseDown?: (e: React.MouseEvent<T>) => void;
  onMouseMove?: (e: React.MouseEvent<T>) => void;
  onMouseUp?: (e: React.MouseEvent<T>) => void;
  onMouseLeave?: (e: React.MouseEvent<T>) => void;
}
