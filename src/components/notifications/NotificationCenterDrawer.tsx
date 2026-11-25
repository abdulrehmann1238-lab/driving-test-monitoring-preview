import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Drawer } from '../common/Drawer';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  Bell,
  Mail,
  MessageSquare,
  Send,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Search,
  Filter,
} from 'lucide-react';

export const NotificationCenterDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    addToast,
  } = useApp();

  const [channelFilter, setChannelFilter] = useState<'all' | 'email' | 'sms' | 'whatsapp' | 'telegram'>('all');
  const [selectedPreview, setSelectedPreview] = useState<any>(null);

  const filtered = notifications.filter((n) => {
    if (channelFilter === 'all') return true;
    return n.channel === channelFilter;
  });

  const getChannelIcon = (ch: string) => {
    switch (ch) {
      case 'email':
        return <Mail className="w-3.5 h-3.5 text-blue-600" />;
      case 'sms':
        return <Smartphone className="w-3.5 h-3.5 text-emerald-600" />;
      case 'whatsapp':
        return <MessageSquare className="w-3.5 h-3.5 text-green-600" />;
      case 'telegram':
        return <Send className="w-3.5 h-3.5 text-sky-500" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-[#557A65]" />;
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Centralized Notification Dispatch & History"
      subtitle="Multi-channel relay monitoring: Email, SMS, WhatsApp, Telegram"
      width="xl"
    >
      <div className="space-y-4 text-xs text-[#202923]">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5EAE5]">
          <div className="flex items-center gap-1 bg-[#EFF2EF] p-0.5 rounded-btn text-[11px]">
            {(['all', 'sms', 'whatsapp', 'telegram', 'email'] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-2.5 py-1 rounded capitalize font-medium transition-all ${
                  channelFilter === ch ? 'bg-white text-[#202923] shadow-subtle' : 'text-[#77817A]'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={markAllNotificationsRead}
          >
            Mark all read
          </Button>
        </div>

        {/* Message Bubble Simulator Preview if an item is selected */}
        {selectedPreview && (
          <div className="p-4 rounded-card bg-[#F6F7F5] border border-[#E5EAE5] space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#202923] flex items-center gap-1.5 uppercase font-mono text-[10px]">
                {getChannelIcon(selectedPreview.channel)}
                {selectedPreview.channel} Simulation Preview Bubble
              </span>
              <button
                onClick={() => setSelectedPreview(null)}
                className="text-[11px] text-[#77817A] hover:underline"
              >
                Close Preview
              </button>
            </div>

            {/* Simulated Phone Bubble Frame */}
            <div className="max-w-md mx-auto p-3.5 rounded-card bg-white shadow-card border border-[#E5EAE5] space-y-2">
              <div className="flex items-center justify-between text-[10px] text-[#77817A] pb-2 border-b border-[#E5EAE5]">
                <span>To: {selectedPreview.recipient}</span>
                <span>{selectedPreview.timestamp}</span>
              </div>
              <p className="font-bold text-xs text-[#202923]">{selectedPreview.title}</p>
              <p className="text-xs text-[#202923] leading-relaxed">{selectedPreview.message}</p>
              {selectedPreview.linkUrl && (
                <div className="p-2 bg-[#557A65]/10 rounded border border-[#557A65]/30 text-[11px] text-[#304F40] font-mono break-all">
                  🔗 {selectedPreview.linkUrl}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notification List */}
        <div className="space-y-2.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedPreview(item);
                markNotificationRead(item.id);
              }}
              className={`p-3 rounded-card border transition-all cursor-pointer hover:border-[#D0D8D1] ${
                !item.read ? 'bg-[#557A65]/5 border-[#557A65]/30' : 'bg-white border-[#E5EAE5]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-full bg-[#EFF2EF]">
                    {getChannelIcon(item.channel)}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-[#202923] leading-none">{item.title}</h4>
                    <span className="text-[10px] text-[#77817A]">{item.recipient}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={item.status === 'delivered' ? 'green' : 'amber'} size="sm" dot>
                    {item.status.toUpperCase()}
                  </Badge>
                  <span className="font-mono text-[10px] text-[#77817A]">{item.timestamp}</span>
                </div>
              </div>

              <p className="text-xs text-[#77817A] pl-8">{item.message}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#E5EAE5] flex justify-between items-center text-xs text-[#77817A]">
          <span>All channels simulated via Mock Provider Gateway.</span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Drawer
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
