let outer: any;
export const result = [1].map(function (value) { return outer = value; });
