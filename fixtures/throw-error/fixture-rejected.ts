export const a = Promise.reject("kaboom");
export const b = Promise.reject(new Error("kaboom"));
export const c = new Promise((resolve, reject) => reject("kaboom"));
export const d = new Promise((resolve, reject) => reject(new Error("kaboom")));
export const e = new Promise(function (resolve, reject) { reject("kaboom"); });
export const f = new Promise(function (resolve, reject) { reject(new Error("kaboom")); });
