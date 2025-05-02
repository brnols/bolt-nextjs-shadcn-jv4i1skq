import type { ReactNode } from 'react';

export const Dialog = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const DialogTrigger = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const DialogContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const DialogClose = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const Separator = () => <hr />;

export const Button = ({ children, type = 'button' }: { children: ReactNode; type?: 'button' | 'submit' | 'reset' }) => (
  <button type={type}>{children}</button>
);