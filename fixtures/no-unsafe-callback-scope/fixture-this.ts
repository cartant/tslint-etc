export class User {
    constructor(private name: string) {
        ["Hello"].map(value => `${value}, ${this.name}.`);
    }
}
