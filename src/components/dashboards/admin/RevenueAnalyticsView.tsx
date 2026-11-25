import React from 'react';
import { useApp } from '../../../context/AppContext';
import { BarChart3, TrendingUp, Users, Radio, CalendarCheck, Download } from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';

export const RevenueAnalyticsView: React.FC = () => {
  const { invoices, addToast } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            Analytics & Conversion Reporting
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Booking conversion funnels, regional detection ratios, and performance metrics.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => addToast('Analytics Report Exported', 'Downloaded analytics summary CSV', 'success')}
          icon={<Download className="w-3.5 h-3.5" />}
        >
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 space-y-3">
          <span className="text-xs font-bold text-[#77817A] uppercase">Booking Conversion Funnel</span>
          <div className="space-y-2 text-xs pt-2">
            <div>
              <div className="flex justify-between mb-1">
                <span>Slots Detected:</span>
                <span className="font-bold">126 (100%)</span>
              </div>
              <div className="h-2 bg-[#EFF2EF] rounded-full overflow-hidden">
                <div className="h-full bg-[#557A65] w-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>15m Locks Initiated:</span>
                <span className="font-bold">84 (66%)</span>
              </div>
              <div className="h-2 bg-[#EFF2EF] rounded-full overflow-hidden">
                <div className="h-full bg-[#557A65] w-2/3" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Candidate Accepted (YES):</span>
                <span className="font-bold">58 (46%)</span>
              </div>
              <div className="h-2 bg-[#EFF2EF] rounded-full overflow-hidden">
                <div className="h-full bg-[#557A65] w-[46%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Verified Bookings Completed:</span>
                <span className="font-bold">18 (14%)</span>
              </div>
              <div className="h-2 bg-[#EFF2EF] rounded-full overflow-hidden">
                <div className="h-full bg-[#304F40] w-[14%]" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <span className="text-xs font-bold text-[#77817A] uppercase">Top Monitored Test Centres</span>
          <div className="space-y-3 text-xs pt-2">
            <div className="flex justify-between items-center p-2 rounded bg-[#F6F7F5]">
              <span className="font-medium">Birmingham South Yardley</span>
              <span className="font-bold text-[#557A65]">34% of volume</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-[#F6F7F5]">
              <span className="font-medium">London Mill Hill</span>
              <span className="font-bold text-[#557A65]">28% of volume</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-[#F6F7F5]">
              <span className="font-medium">Leeds Harehills</span>
              <span className="font-bold text-[#557A65]">19% of volume</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <span className="text-xs font-bold text-[#77817A] uppercase">Target Latency Performance</span>
          <div className="space-y-2 text-xs pt-2">
            <p className="text-3xl font-heading font-extrabold text-[#557A65]">1.4s Avg</p>
            <p className="text-[#77817A]">
              98.4% of cancellations captured within the 0–5 second target window across all 8 distributed worker nodes.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
