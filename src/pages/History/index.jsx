import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/ui/Card";
import { useStore } from "../../store";
import {
  History,
  Trash2,
  Download,
  Search,
  MessageSquare,
  Edit2,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HistoryPage = () => {
  const conversations = useStore((state) => state.conversations);
  const deleteConversation = useStore((state) => state.deleteConversation);
  const renameConversation = useStore((state) => state.renameConversation);
  const switchConversation = useStore((state) => state.switchConversation);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Filter conversations by search
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.messages.some((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const exportConversation = (conv) => {
    const data = JSON.stringify(conv, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${conv.name.replace(
      /\s+/g,
      "_"
    )}-${new Date().toISOString()}.json`;
    a.click();
  };

  const exportAll = () => {
    const data = JSON.stringify(conversations, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `voxai-all-conversations-${new Date().toISOString()}.json`;
    a.click();
  };

  const handleRename = (id) => {
    if (editName.trim()) {
      renameConversation(id, editName.trim());
      setEditingId(null);
      setEditName("");
    }
  };

  const startEdit = (conv) => {
    setEditingId(conv.id);
    setEditName(conv.name);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between z-10 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl font-bold font-display mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/60">
                Memory Stream
              </h1>
              <p className="text-muted-foreground text-lg">
                {conversations.length} conversation
                {conversations.length !== 1 ? "s" : ""} recorded
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2"
            >
              <Button
                variant="outline"
                onClick={exportAll}
                disabled={conversations.length === 0}
                className="backdrop-blur-md text-nowrap bg-white/50 dark:bg-white/5 border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </motion.div>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative z-20"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-black/5 dark:border-white/10 focus:border-primary/50 focus:bg-white dark:focus:bg-white/10 focus:outline-none transition-all duration-300 backdrop-blur-xl text-lg placeholder:text-muted-foreground/50 shadow-lg text-foreground"
            />
          </motion.div>

          {/* Conversations Timeline */}
          {filteredConversations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-16 text-center border-dashed border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm shadow-none">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <History className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-display">
                  {conversations.length === 0
                    ? "Your Journey Begins Here"
                    : "No Memories Found"}
                </h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  {conversations.length === 0
                    ? "Start talking to VoxAI to create your first memory."
                    : "We couldn't find any conversations matching your search."}
                </p>
              </Card>
            </motion.div>
          ) : (
            <div className="relative pl-8 space-y-8 min-h-[500px]">
              {/* Timeline Line */}
              <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-black/10 dark:via-white/10 to-transparent" />

              <AnimatePresence mode="popLayout">
                {filteredConversations.map((conv, index) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    {/* Timeline Connector */}
                    <div className="absolute -left-[1.3rem] top-8 w-4 h-4 rounded-full bg-background border-4 border-primary shadow-[0_0_10px_2px_rgba(59,130,246,0.3)] z-10" />

                    <Card className="p-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer group border-black/5 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-sm dark:shadow-none">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            {editingId === conv.id ? (
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onBlur={() => handleRename(conv.id)}
                                onKeyDown={(e) =>
                                  e.key === "Enter" && handleRename(conv.id)
                                }
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-black/40 border border-primary focus:outline-none text-lg font-bold text-foreground"
                                autoFocus
                              />
                            ) : (
                              <h3 className="font-bold text-xl truncate group-hover:text-primary transition-colors">
                                {conv.name}
                              </h3>
                            )}
                            <p className="text-xs font-medium text-muted-foreground/70 mt-1 uppercase tracking-wider flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                              {formatDate(conv.updatedAt)}
                            </p>
                          </div>
                          <button
                            onClick={() => startEdit(conv)}
                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-muted-foreground hover:text-foreground dark:hover:text-white"
                            title="Rename"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{conv.messageCount} messages</span>
                          </div>
                        </div>

                        {/* Preview */}
                        {conv.messages.length > 0 && (
                          <div className="text-sm text-muted-foreground/80 line-clamp-2 bg-gray-50/50 dark:bg-black/20 p-3 rounded-lg border border-black/5 dark:border-white/5 italic">
                            &quot;
                            {conv.messages[conv.messages.length - 1].content}
                            &quot;
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-4 border-t border-white/5">
                          <Button
                            variant="glow"
                            size="sm"
                            className="flex-1 dark:bg-primary/20 bg-primary hover:bg-primary/80 dark:hover:bg-primary/30 dark:text-primary text-white dark:border-primary/20"
                            onClick={() => {
                              switchConversation(conv.id);
                              window.location.href = "/app";
                            }}
                          >
                            Continue Chat
                          </Button>
                          <button
                            onClick={() => exportConversation(conv)}
                            className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground dark:hover:text-white border border-transparent hover:border-black/5 dark:hover:border-white/10"
                            title="Export"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteConversation(conv.id)}
                            disabled={conversations.length === 1}
                            className="px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-red-500/20"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HistoryPage;
