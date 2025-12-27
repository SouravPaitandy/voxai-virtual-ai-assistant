import Hammer from 'hammerjs';

class GestureController {
  constructor(element, callbacks) {
    this.element = element;
    this.callbacks = callbacks;
    this.hammer = null;
    this.initialize();
  }

  initialize() {
    this.hammer = new Hammer(this.element);
    
    // Configure recognizers
    this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    // Add gesture handlers
    this.setupGestureHandlers();
  }

  setupGestureHandlers() {
    // Swipe handlers
    this.hammer.on('swipeleft', () => {
      if (this.callbacks.onSwipeLeft) {
        this.callbacks.onSwipeLeft();
      }
    });

    this.hammer.on('swiperight', () => {
      if (this.callbacks.onSwipeRight) {
        this.callbacks.onSwipeRight();
      }
    });

    // Double tap handler
    this.hammer.on('doubletap', () => {
      if (this.callbacks.onDoubleTap) {
        this.callbacks.onDoubleTap();
      }
    });

    // Pan handler
    this.hammer.on('pan', (ev) => {
      if (this.callbacks.onPan) {
        this.callbacks.onPan(ev);
      }
    });
  }

  destroy() {
    if (this.hammer) {
      this.hammer.destroy();
    }
  }
}

export default GestureController;