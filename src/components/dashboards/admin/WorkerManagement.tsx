import React, { useState } from 'react';
import { WorkerNode } from '../../../types';
import { useApp } from '../../../context/AppContext';
import {
  Cpu,
  Activity,
  RotateCw,
  Pause,
  Play,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { Drawer } from '../../common/Drawer';

export const WorkerManagement: React.FC = () => {
  const { workers, addToast, addAuditLog } = useApp();
  const [selectedWorker, setSelectedWorker] = useState<WorkerNode | null>(null);
  const [isRestarting, setIsRestarting] = useState<string | null>(null);

  const handleRestart = (worker: WorkerNode) => {
    setIsRestarting(worker.id);
    addToast('Worker Restart Triggered', `Initiating warm reload of container ${worker.name}...`, 'info');
    setTimeout(() => {
      setIsRestarting(null);
      addToast('Worker Synchronized', `${worker.name} restarted and re-joined cluster in 1.2s.`, 'success');
      addAuditLog('WORKER_RELOAD', worker.id, 'success', 'Simulated container reload nominal');
    }, 1400);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            Worker Node Management
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Distributed scan nodes, queue capacity, and container health telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="green" size="md" dot>
            8 / 8 Nodes Active
          </Badge>
          <Button
            variant="outline"
            size="sm"
            icon={<RotateCw className="w-3 h-3" />}
            onClick={() => addToast('Cluster Heartbeat Check', 'All 8 worker containers reported latency < 15ms.', 'success')}
          >
            Poll Nodes
          </Button>
        </div>
      </div>

      {/* Worker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {workers.map((worker) => {
          const isWarning = worker.status === 'warning';
          const isBusy = isRestarting === worker.id;

          return (
            <Card
              key={worker.id}
              hoverEffect
              className={`p-4 flex flex-col justify-between ${
                isWarning ? 'border-amber-300 bg-amber-50/20' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#77817A] uppercase bg-[#EFF2EF] px-1.5 py-0.5 rounded">
                    {worker.id}
                  </span>
                  <Badge variant={isWarning ? 'amber' : 'green'} size="sm" dot>
                    {isBusy ? 'RESTARTING...' : worker.status.toUpperCase()}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-sm text-[#202923]">
                    {worker.name}
                  </h3>
                  <p className="text-[11px] text-[#77817A]">{worker.region}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#F6F7F5] p-2.5 rounded-btn">
                  <div>
                    <span className="text-[#77817A] block">Assigned Tasks</span>
                    <span className="font-bold text-[#202923]">{worker.assignedTasks}</span>
                  </div>
                  <div>
                    <span className="text-[#77817A] block">Processing</span>
                    <span className="font-bold text-[#557A65]">{worker.processingRate}</span>
                  </div>
                  <div>
                    <span className="text-[#77817A] block">CPU Load</span>
                    <span className="font-mono text-[#202923]">{worker.cpuUsage}%</span>
                  </div>
                  <div>
                    <span className="text-[#77817A] block">Memory</span>
                    <span className="font-mono text-[#202923]">{worker.memoryUsage}%</span>
                  </div>
                </div>

                <div className="text-[10px] text-[#77817A] flex items-center justify-between">
                  <span>Heartbeat: {worker.lastHeartbeat}</span>
                  <span className="text-[#557A65]">Ping: 8ms</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#E5EAE5] mt-3 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-[11px]"
                  disabled={isBusy}
                  onClick={() => handleRestart(worker)}
                  icon={<RotateCw className={`w-3 h-3 ${isBusy ? 'animate-spin' : ''}`} />}
                >
                  Restart
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 text-[11px]"
                  onClick={() => setSelectedWorker(worker)}
                  icon={<FileText className="w-3 h-3" />}
                >
                  Logs
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Worker Log Drawer */}
      <Drawer
        isOpen={Boolean(selectedWorker)}
        onClose={() => setSelectedWorker(null)}
        title={selectedWorker?.name || 'Worker Logs'}
        subtitle={`Region: ${selectedWorker?.region} • Node: ${selectedWorker?.id}`}
      >
        {selectedWorker && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#EFF2EF] rounded-card flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#77817A] uppercase block">Container Health</span>
                <span className="font-semibold text-[#202923]">
                  {selectedWorker.status === 'healthy' ? 'Nominal • Low Latency' : 'Elevated Load Notice'}
                </span>
              </div>
              <Badge variant={selectedWorker.status === 'healthy' ? 'green' : 'amber'} dot>
                {selectedWorker.status.toUpperCase()}
              </Badge>
            </div>

            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#77817A] mb-2">
                Container Console Output (Live Buffer)
              </h4>
              <div className="p-3 bg-[#202923] text-[#EFF2EF] rounded-card font-mono text-[11px] space-y-2 max-h-96 overflow-y-auto">
                {selectedWorker.logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#A7BBA9] shrink-0">[{log.time}]</span>
                    <span
                      className={`font-semibold shrink-0 ${
                        log.level === 'warn'
                          ? 'text-amber-400'
                          : log.level === 'success'
                          ? 'text-emerald-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {log.level.toUpperCase()}:
                    </span>
                    <span className="text-white/90">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="secondary" onClick={() => setSelectedWorker(null)}>
                Close Console
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
