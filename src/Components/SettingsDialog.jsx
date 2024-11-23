/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '../components';
import useSettingsStore from '../SettingsStore';
import { Download, Upload, Save, X, Settings, Shield, Database, Trash2Icon } from 'lucide-react';
// import privacyManager from './privacyManager.js';
// import { json } from 'react-router-dom';

const DataManagementSection = ({ isDark, onSuccess }) => {
  const [importStatus, setImportStatus] = useState({ type: '', message: '' });
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const data = {
        settings: {
          fontSize: localStorage.getItem('fontSize'),
          fontFamily: localStorage.getItem('fontFamily'),
          lineHeight: localStorage.getItem('lineHeight'),
          theme: localStorage.getItem('theme'),
        },
        conversations: JSON.parse(localStorage.getItem("voxAISession") || '[]'),
        notes: JSON.parse(localStorage.getItem('voxai-notes') || '[]'),
        customSettings: JSON.parse(localStorage.getItem('settings') || '{}')
      };
      console.log("JSON.parse(localStorage.getItem('voxAISession'))", JSON.parse(localStorage.getItem("voxAISession")))
      if(data.conversations) console.log("conversations present.")
      else console.log("not present")

      // Create a formatted date string
      const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `voxai-backup-${date}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      setImportStatus({ type: 'success', message: 'Data exported successfully!' });
      setTimeout(() => setImportStatus({ type: '', message: '' }), 3000);
    } catch (error) {
      setImportStatus({ 
        type: 'error', 
        message: `Failed to export data. Please try again. ${error}` 
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate data structure
      if (!data.settings && !data.conversations && !data.notes) {
        throw new Error('Invalid backup file format');
      }

      // Import settings
      if (data.settings) {
        Object.entries(data.settings).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
      }

      // Import conversations
      if (data.conversations) {
        localStorage.setItem('VoxAISession', JSON.stringify(data.conversations));
      }

      // Import notes
      if (data.notes) {
        localStorage.setItem('voxai-notes', JSON.stringify(data.notes));
      }

      // Import custom settings
      if (data.customSettings) {
        localStorage.setItem('settings', JSON.stringify(data.customSettings));
      }

      setImportStatus({ type: 'success', message: 'Data imported successfully! Reloading...' });
      onSuccess?.();
      
      // Reload after a short delay to apply new settings
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setImportStatus({ 
        type: 'error', 
        message: `Failed to import data. Please check the file format. ${error}`
      });
    }
    
    // Reset file input
    event.target.value = '';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Data Management</h3>
      
      {/* Status Message */}
      {importStatus.message && (
        <div className={`text-sm px-3 py-2 rounded-md ${
          importStatus.type === 'success' 
            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
        }`}>
          {importStatus.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className={`w-full sm:flex-1 p-2 rounded-md ${
            isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors text-sm flex items-center justify-center gap-2`}
        >
          <Download size={16} />
          {isExporting ? 'Exporting...' : 'Export Data'}
        </button>

        {/* Import Button */}
        <label className={`w-full sm:flex-1 p-2 rounded-md cursor-pointer ${
          isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
        } text-white transition-colors text-sm flex items-center justify-center gap-2`}>
          <Upload size={16} />
          Import Data
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>• Exports/Imports: settings, conversations, and notes</p>
        <p>• Only .json files are supported</p>
      </div>
    </div>
  );
};

const PrivacySettings = ({ privacySettings, onPrivacySettingsChange }) => {
  const [settings, setSettings] = useState(privacySettings);

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log(settings)
    onPrivacySettingsChange(settings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Privacy Settings</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage how your data is collected, stored and used
        </p>
      </div>
      
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 gap-4">
          <div>
            <label className="font-medium">Save Conversation History</label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Store your chat conversations locally for future reference
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.saveHistory}
              onChange={(e) => handleChange('saveHistory', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
              peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
              dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
              after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
              after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 gap-4">
          <div>
            <label className="font-medium">Share Analytics</label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Help improve the app by sharing anonymous usage data
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.shareAnalytics}
              onChange={(e) => handleChange('shareAnalytics', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
              peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
              dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
              after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
              after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div>
              <label className="font-medium">Data Retention Period</label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose how long to keep your data (1-365 days)
              </p>
            </div>
            <input
              type="number"
              value={settings.retentionPeriod}
              onChange={(e) => handleChange('retentionPeriod', parseInt(e.target.value))}
              min="1"
              max="365"
              className="w-full sm:w-20 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" 
              style={{width: `${(settings.retentionPeriod / 365) * 100}%`}}></div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="w-full p-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 
            text-white transition-colors flex items-center justify-center gap-2"
        >
          Save Privacy Settings
        </button>
      </div>
    </div>
  );
};

const SettingsDialog = ({
  showSettings, 
  setShowSettings, 
  isDark,
  isNotificationsEnabled,
  // handleExportHistory,
  requestNotificationPermission,
  privacySettings,
  onPrivacySettingsChange,
}) => {
  const [voices, setVoices] = useState([]);
  const [currentVoice, setCurrentVoice] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [showSidebar, setShowSidebar] = useState(false);
  
  const {
    fontSize,
    fontFamily, 
    lineHeight,
    setFontSize,
    setFontFamily,
    setLineHeight,
  } = useSettingsStore();

  useEffect(() => {
    const initVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      const savedVoiceName = localStorage.getItem('selectedVoiceName');
      if (savedVoiceName) {
        const savedVoice = availableVoices.find(voice => voice.name === savedVoiceName);
        if (savedVoice) {
          setCurrentVoice(savedVoice);
          window.selectedVoice = savedVoice;
        }
      } else if (availableVoices.length > 0) {
        setCurrentVoice(availableVoices[0]);
        window.selectedVoice = availableVoices[0];
      }
    };

    initVoices();
    window.speechSynthesis.onvoiceschanged = initVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleVoiceChange = (e) => {
    const selectedVoice = voices.find(voice => voice.name === e.target.value);
    if (selectedVoice) {
      setCurrentVoice(selectedVoice);
      window.selectedVoice = selectedVoice;
      
      const utterance = new SpeechSynthesisUtterance("Testing voice");
      utterance.voice = selectedVoice;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSaveSettings = () => {
    if (currentVoice) {
      localStorage.setItem('selectedVoiceName', currentVoice.name);
    }
    
    localStorage.setItem('settings', JSON.stringify({
      fontSize,
      fontFamily,
      lineHeight,
      isNotificationsEnabled
    }));

    setShowSettings(false);
  };

  const fontFamilies = [
    { value: 'System-ui', label: 'System-ui'},
    { value: 'Roboto Mono', label: 'Roboto Mono'},
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans' },
    { value: 'Outfit', label: 'Outfit' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Voice Settings</h3>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Select Voice</label>
                {voices.length > 0 ? (
                  <select
                    value={currentVoice?.name || ''}
                    onChange={handleVoiceChange}
                    className={`w-full p-2.5 rounded-lg border transition-colors ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white hover:border-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
                    }`}
                  >
                    {voices.map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="animate-pulse w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Display Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Font Size: {fontSize}px</label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>12px</span>
                    <span>24px</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Font Family</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className={`w-full p-2.5 rounded-lg border transition-colors ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white hover:border-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
                    }`}
                  >
                    {fontFamilies.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Line Height: {lineHeight}</label>
                  <input
                    type="range"
                    min="1"
                    max="2"
                    step="0.1"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1.0</span>
                    <span>2.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        console.log(privacySettings)
        return <PrivacySettings privacySettings={privacySettings} onPrivacySettingsChange={onPrivacySettingsChange}/>;
      case 'data':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Data Management</h3>
              <DataManagementSection 
                isDark={isDark}
                onSuccess={() => setShowSettings(false)}
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              <button
                onClick={requestNotificationPermission}
                className={`w-full p-2.5 rounded-lg text-white transition-colors ${
                  isNotificationsEnabled
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
              >
                {isNotificationsEnabled ? "Notifications Enabled" : "Enable Notifications"}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AlertDialog open={showSettings} onOpenChange={setShowSettings}>
      <AlertDialogContent
        className={`${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } sm:max-w-[38rem] md:max-w-3xl mx-auto rounded-xl shadow-xl overflow-hidden h-[90vh]`}
      >
        <div className="flex flex-col sm:flex-row h-full">
          {/* Simplified Mobile Menu Button */}
          <button
            className="sm:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <Settings size={20} />
          </button>

          {/* Improved Mobile Sidebar */}
          {showSidebar && (
            <div className="sm:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40">
              <div 
                className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-gray-800 p-6 shadow-xl transition-transform"
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold mb-6">Settings</h2>
                <div className="space-y-2">
                  {['general', 'privacy', 'data'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setShowSidebar(false);
                      }}
                      className={`w-full p-3 rounded-lg text-left capitalize transition-colors flex items-center gap-3 ${
                        activeTab === tab
                          ? isDark 
                            ? 'bg-gray-700 text-white font-medium'
                            : 'bg-gray-100 text-gray-900 font-medium'
                          : isDark
                            ? 'text-gray-400 hover:bg-gray-700/50'
                            : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {tab === 'general' && <Settings size={18} />}
                      {tab === 'privacy' && <Shield size={18} />}
                      {tab === 'data' && <Database size={18} />}
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Desktop Sidebar */}
          <div className="hidden sm:flex flex-col w-52 md:w-72 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Settings</h2>
              <div className="space-y-2">
                {['general', 'privacy', 'data'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full p-4 rounded-lg text-left capitalize transition-all flex items-center gap-3 ${
                      activeTab === tab
                        ? 'bg-white dark:bg-gray-700 shadow-md font-medium'
                        : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {tab === 'general' && <Settings size={18} />}
                    {tab === 'privacy' && <Shield size={18} />}
                    {tab === 'data' && <Database size={18} />}
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Improved Main Content Area */}
          <div className="flex-1 flex flex-col h-full w-full">
            {/* Enhanced Header */}
            <div className="sticky top-0 z-10 px-6 py-4 border-b border-gray-200 dark:border-gray-700
              bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <div className="flex justify-between items-center">
                <AlertDialogTitle className="text-2xl font-semibold capitalize">
                  {activeTab} Settings
                </AlertDialogTitle>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AlertDialogDescription className="space-y-6">
                {renderTabContent()}
              </AlertDialogDescription>
            </div>

            {/* Enhanced Footer */}
            <div className="sticky bottom-0 px-6 py-4 border-t border-gray-200 dark:border-gray-700
              bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <div className="flex gap-3">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 p-3 rounded-lg bg-blue-500 hover:bg-blue-600 
                    text-white transition-all flex items-center justify-center gap-2 font-medium
                    shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                >
                  <Save size={20} />
                  Save
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-all font-medium
                      flex items-center justify-center gap-2"
                >
                  <Trash2Icon size={20}/>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettingsDialog;