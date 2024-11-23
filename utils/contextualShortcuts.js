class ContextualShortcuts {
    constructor() {
      this.shortcuts = new Map();
      this.activeContext = null;
      this.initializeDefaultShortcuts();
    }
  
    initializeDefaultShortcuts() {
      // Chat context shortcuts
      this.addContextualShortcut('chat', [
        {
          key: 'ctrl+space',
          action: 'toggleVoice',
          description: 'Toggle voice input'
        },
        {
          key: 'ctrl+b',
          action: 'clearChat',
          description: 'Clear chat history'
        }
      ]);
  
      // Settings context shortcuts
      this.addContextualShortcut('settings', [
        {
          key: 'esc',
          action: 'closeSettings',
          description: 'Close settings panel'
        },
        {
          key: 'ctrl+s',
          action: 'saveSettings',
          description: 'Save settings'
        }
      ]);
    }
  
    addContextualShortcut(context, shortcuts) {
      this.shortcuts.set(context, shortcuts);
    }
  
    setActiveContext(context) {
      this.activeContext = context;
      return this.getActiveShortcuts();
    }
  
    getActiveShortcuts() {
      return this.shortcuts.get(this.activeContext) || [];
    }
  
    handleKeyPress(event) {
      const activeShortcuts = this.getActiveShortcuts();
      const pressedKey = this.getPressedKeyCombo(event);
      
      const matchingShortcut = activeShortcuts.find(
        shortcut => shortcut.key === pressedKey
      );
  
      if (matchingShortcut) {
        event.preventDefault();
        return matchingShortcut.action;
      }
      
      return null;
    }
  
    getPressedKeyCombo(event) {
      const combo = [];
      if (event.ctrlKey) combo.push('ctrl');
      if (event.shiftKey) combo.push('shift');
      if (event.altKey) combo.push('alt');
      if (event.key !== 'Control' && 
          event.key !== 'Shift' && 
          event.key !== 'Alt') {
        combo.push(event.key.toLowerCase());
      }
      return combo.join('+');
    }
  }
  
  export default new ContextualShortcuts();