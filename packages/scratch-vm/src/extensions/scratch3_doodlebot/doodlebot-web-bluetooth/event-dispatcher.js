/*
 * micro:bit Web Bluetooth
 * Copyright (c) 2019 Rob Moran
 *
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const EventEmitter = require("events");

/**
 * interface TypedDispatcher<T> {
 ** addEventListener<K extends keyof T>(type: K, listener: (event: CustomEvent<T[K]>) => void): void;
 ** removeEventListener<K extends keyof T>(type: K, callback: (event: CustomEvent<T[K]>) => void): void;
 ** dispatchEvent(event: CustomEvent<T>): boolean;
 ** dispatchEvent<K extends keyof T>(type: K, detail: T[K]): boolean;
 ** addListener<K extends keyof T>(event: K, listener: (data: T[K]) => void): this;
 ** on<K extends keyof T>(event: K, listener: (data: T[K]) => void): this;
 ** once<K extends keyof T>(event: K, listener: (data: T[K]) => void): this;
 ** prependListener<K extends keyof T>(event: K, listener: (data: T[K]) => void): this;
 ** prependOnceListener<K extends keyof T>(event: K, listener: (data: T[K]) => void): this;
 ** removeListener<K extends keyof T>(event: K, listener: (data: T[K]) => void): this;
 ** removeAllListeners<K extends keyof T>(event?: K): this;
 *
 ** listeners<K extends keyof T>(event: K): Function[];
 ** emit<K extends keyof T>(event: K, data: T[K]): boolean;
 *
 ** eventNames<K extends keyof T>(): Array<K>;
 ** listenerCount<K extends keyof T>(type: K): number;
 ** setMaxListeners(n: number): this;
 ** getMaxListeners(): number;
 */

class EventDispatcher extends EventEmitter {
    isEventListenerObject(listener) {
        return listener.handleEvent !== undefined;
    }

    addEventListener(type, listener) {
        if (listener) {
            const handler = this.isEventListenerObject(listener)
                ? listener.handleEvent
                : listener;
            super.addListener(type, handler);
        }
    }

    removeEventListener(type, callback) {
        if (callback) {
            const handler = this.isEventListenerObject(callback)
                ? callback.handleEvent
                : callback;
            super.removeListener(type, handler);
        }
    }

    dispatchEvent(eventOrType, detail) {
        let event;
        if (typeof eventOrType === "string") {
            event = new CustomEvent(eventOrType, {
                detail,
            });
        } else {
            event = eventOrType;
        }

        return super.emit(event.type, event);
    }
}
module.exports = EventDispatcher;
