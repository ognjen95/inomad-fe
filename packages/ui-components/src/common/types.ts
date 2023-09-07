import { FC, ReactNode } from "react";

export type FCWithChildren<T = object> = FC<{ children?: ReactNode } & T>;
