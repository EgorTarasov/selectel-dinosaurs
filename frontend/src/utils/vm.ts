import { FC } from "react";

export type FCVM<T extends object> = FC<{ vm: T }>;
