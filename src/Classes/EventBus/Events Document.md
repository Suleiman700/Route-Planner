
# Event System

This document explains the implementation of an event system in JavaScript, which allows for registering, unregistering, and triggering events. The event system is designed to be modular and extensible, allowing you to create separate event classes for different parts of your application.

### Base Events Class

The base `Events` class provides the core functionality for managing events. It includes the following methods:

`on(eventName, callback)`

Registers a callback function for a specific event.

###### Parameters:
- `eventName` (string): The name of the event to register for.
- `callback` (Function): The callback function to be executed when the event is triggered.

---

`off(eventName, callback)`

Removes a registered callback function for a specific event.

###### Parameters:

- `eventName` (string): The name of the event to unregister from.
- `callback` (Function): The callback function to be removed.

---

`emit(eventName, data)`

Triggers an event and executes all registered callback functions.

###### Parameters:

- `eventName` (string): The name of the event to trigger.
- `data` (any): Optional data to pass to the callback functions.

---

`clearEvent(eventName)`

Removes all registered callback functions for a specific event.

###### Parameters:

- `eventName` (string): The name of the event to clear callbacks for.

---

`clearAllEvents()`

Removes all registered callback functions for all events.

---

### Derived Event Classes

You can create separate classes that extend the base Events class for different parts of your application. This helps organize and encapsulate event-related logic based on functionality.

---

### Event Name Constants

It's recommended to define event name constants in a separate file or module to ensure consistency and avoid typos or naming inconsistencies throughout your codebase.

Please note the following:
- Event names should be unique across all events.
- Event names should be descriptive and meaningful.
- Event names should not include special characters or spaces.
- Event names should be written in camelCase.
- Event names should be built in the following template: partOne_PartTwo, Where partOne equals the const name and partTwo is the event name

```javascript

// Specific events for the EventBus (store per project)
export const EBUS_EVENTS = {
    // Example event name
    PAYMENT_MODAL: {
        OPEN: 'PAYMENT_MODAL_OPEN',
        CLOSE: 'PAYMENT_MODAL_CLOSE',
    },
}
```

---

### Usage

```javascript
import Events from '/javascript/Classes/Events/Events.js';
import ProgramEvents from '/javascript/Classes/Events/ProgramEvents.js';
import { EVENTS_PROGRAM } from '/javascript/Classes/Events/EVENTS_CONST.js';

// -------------------
// Subscribe to events
// -------------------

const handleEvent = () => {
    console,log('event triggered, Payment modal closed');
    
    // Optional - un-register from event once triggered
    ProgramEvents.off(EBUS_EVENTS.PAYMENT_MODAL.CLOSE, handleEvent)
}
ProgramEvents.on(EBUS_EVENTS.PAYMENT_MODAL.CLOSE, handleEvent);

// -------------------
// Emit an event
// -------------------

const events = new Events();
events.emit(EBUS_EVENTS.PAYMENT_MODAL.CLOSE)
```