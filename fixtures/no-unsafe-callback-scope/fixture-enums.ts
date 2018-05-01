import { Vertical } from "./enums";

enum Horizontal {
    Left = 1,
    Right
}

export const result = [1].map(() => Horizontal.Left).map(() => Vertical.Up);
