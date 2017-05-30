import Storage from './Storage.jsx';

class Event {
    constructor() {
        this.listeners = new Map();
    }

    trigger(name) {
        const listener = this.listeners.get(name);
        if (!listener) return;
        listener[0]();
    }

    on(name, callback) {
        let callbacks = this.listeners.get(name);
        if (!callbacks) {
            callbacks = [];
        }
        callbacks.push(callback);
        this.listeners.set(name, callbacks);
    }
}
const event = new Event();
export default event;