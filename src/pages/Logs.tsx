import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Activity, Download, Filter, Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { FullScreenLoader } from "../components/ui/loader";

export function Logs() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const mockLogs = [
    { id: "log-1", time: "2024-05-10 14:32:01", service: "yolo-inference", level: "INFO", message: "Model YOLOv8-Nano loaded in 45ms" },
    { id: "log-2", time: "2024-05-10 14:35:12", service: "camera-manager", level: "WARN", message: "Stream reconnecting: Parking Lot" },
    { id: "log-3", time: "2024-05-10 14:40:05", service: "auth-service", level: "ERROR", message: "Rate limit exceeded for IP 192.168.1.100" },
    { id: "log-4", time: "2024-05-10 15:00:00", service: "system", level: "INFO", message: "Scheduled backup completed successfully" },
    { id: "log-5", time: "2024-05-10 15:15:22", service: "yolo-inference", level: "INFO", message: "Processed 1000 frames on Camera 1" },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 600);
  }, []);

  const handleExport = () => {
    toast.success("Downloading logs (structlog format)...");
  };

  const filteredLogs = mockLogs.filter(log => 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <FullScreenLoader isLoading={true} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Activity size={28} /> System Logs
          </h2>
          <p className="text-muted-foreground">Monitor structured logs and application performance.</p>
        </div>
        <Button onClick={handleExport} className="gap-2 bg-purple-600 hover:bg-purple-700">
          <Download size={16} /> Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center gap-2">
            <Search className="text-muted-foreground" size={18} />
            <Input 
              placeholder="Filter logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2"><Filter size={14}/> Level Filter</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-900 border-b text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Timestamp</th>
                  <th className="px-4 py-3 font-medium">Level</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{log.time}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        log.level === 'INFO' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
                        log.level === 'ERROR' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400'
                      }`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-purple-600 dark:text-purple-400 whitespace-nowrap">{log.service}</td>
                    <td className="px-4 py-3 w-full">{log.message}</td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No logs found matching your criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
