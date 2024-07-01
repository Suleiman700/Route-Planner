/**
 * Events class for managing and dispatching events.
 */
export default class EventBus {
    constructor() {
        this.events = {};
    }

    /**
     * Register a callback function for a specific event.
     *
     * @param {string} eventName - The name of the event to register for.
     * @param {Function} callback - The callback function to be executed when the event is triggered.
     */
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    /**
     * Remove a registered callback function for a specific event.
     *
     * @param {string} eventName - The name of the event to unregister from.
     * @param {Function} callback - The callback function to be removed.
     */
    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        }
    }

    /**
     * Trigger an event and execute all registered callback functions.
     *
     * @param {string} eventName - The name of the event to trigger.
     * @param {any} data - Optional data to pass to the callback functions.
     */
    emit(eventName, data=null) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => callback(data));
        }
    }

    /**
     * Remove all registered callback functions for a specific event.
     *
     * @param {string} eventName - The name of the event to clear callbacks for.
     */
    clearEvent(eventName) {
        if (this.events[eventName]) {
            this.events[eventName] = [];
        }
    }

    /**
     * Remove all registered callback functions for all events.
     */
    clearAllEvents() {
        this.events = {};
    }
}