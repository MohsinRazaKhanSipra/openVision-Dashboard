import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

import { Camera, Activity, AlertTriangle, Cpu } from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { name: 'Mon', detections: 4000, alerts: 240, errors: 20 },
  { name: 'Tue', detections: 3000, alerts: 139, errors: 10 },
  { name: 'Wed', detections: 2000, alerts: 980, errors: 45 },
  { name: 'Thu', detections: 2780, alerts: 390, errors: 30 },
  { name: 'Fri', detections: 1890, alerts: 480, errors: 15 },
  { name: 'Sat', detections: 2390, alerts: 380, errors: 22 },
  { name: 'Sun', detections: 3490, alerts: 430, errors: 18 },
];

const logs = [
  { id: 1, time: "10:24 AM", message: "YOLOv8 Model loaded successfully", type: "info" },
  { id: 2, time: "09:12 AM", message: "High latency on Camera-02", type: "warning" },
  { id: 3, time: "08:45 AM", message: "Unauthorized access attempt blocked (Rate Limit)", type: "error" },
  { id: 4, time: "08:00 AM", message: "System backup completed", type: "info" },
];

export function Dashboard() {
  const exportReport = (format: string) => {
    toast.success(`Exporting ${format} report...`);
    setTimeout(() => {
      toast.success(`${format} Report downloaded via WeasyPrint engine (Mock)`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Overview</h2>
          <p className="text-muted-foreground">Monitor your computer vision performance metrics.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportReport("CSV")}>Export CSV</Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => exportReport("PDF")}>Export PDF</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Detections</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19,550</div>
            <p className="text-xs text-muted-foreground">+20.1% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 / 15</div>
            <p className="text-xs text-muted-foreground">3 offline</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts Triggered</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,039</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GPU Utilization</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">Normal operating range</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Detections Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-200 dark:text-gray-800" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} className="text-gray-500 dark:text-gray-400" />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} className="text-gray-500 dark:text-gray-400" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    itemStyle={{ color: '#8b5cf6' }}
                  />
                  <Area type="monotone" dataKey="detections" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorDetections)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs.map(log => (
                <div key={log.id} className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${log.type === 'error' ? 'bg-red-500' : log.type === 'warning' ? 'bg-yellow-500' : 'bg-purple-500'}`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{log.message}</p>
                    <p className="text-sm text-muted-foreground">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
