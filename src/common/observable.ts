type EventCallback<Args> = (args: Args) => void;

export class Observable<Args> {
    private callbacks: EventCallback<Args>[] = [];

    subscribe(callback: EventCallback<Args>) {
        this.callbacks.push(callback);
    }

    async next(args: Args) {
        this.callbacks.forEach((callback) => callback(args));
    }
}
