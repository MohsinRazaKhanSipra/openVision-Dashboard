import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Shield, Users, Server, HardDrive, Key, ToggleRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { FullScreenLoader } from "../components/ui/loader";
import { useAuthStore } from "../store/auth";
import { Navigate } from "react-router-dom";

export function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const [rateLimit, setRateLimit] = useState(100);
  const { user } = useAuthStore();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  const handleSave = () => {
    toast.success("Admin settings updated securely");
  };

  const clearCache = () => {
    toast.info("Clearing system cache...");
    setTimeout(() => toast.success("Cache cleared! Storage freed: 1.2GB"), 1500);
  };

  if (isLoading) return <FullScreenLoader isLoading={true} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-red-600 dark:text-red-500 flex items-center gap-2">
            <Shield size={28} /> System Administration
          </h2>
          <p className="text-muted-foreground">Manage core system components and security settings.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-red-100 dark:border-red-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Server size={18} /> API Rate Limiting</CardTitle>
            <CardDescription>Django Ratelimit Configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Requests per minute (per IP)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  className="flex-1 accent-red-600" 
                  min="10" max="1000" 
                  value={rateLimit} 
                  onChange={(e) => setRateLimit(Number(e.target.value))} 
                />
                <span className="w-12 text-right font-mono text-sm">{rateLimit}</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-zinc-100 dark:bg-zinc-900">
              <span className="text-sm font-medium">Block Malicious IPs</span>
              <ToggleRight className="text-red-600" size={24} />
            </div>
            <Button onClick={handleSave} className="w-full bg-red-600 hover:bg-red-700">Apply Policy</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HardDrive size={18} /> Database & Storage</CardTitle>
            <CardDescription>PostgreSQL & Media Storage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Database Size</span>
                <span className="font-mono">4.2 GB</span>
              </div>
              <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[42%]"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Media/Video Storage</span>
                <span className="font-mono">845 GB / 1 TB</span>
              </div>
              <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[84%]"></div>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
               <Button variant="outline" className="flex-1">Backup DB</Button>
               <Button variant="outline" onClick={clearCache} className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 gap-2"><Trash2 size={16}/> Clear Cache</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Key size={18} /> API & Integrations</CardTitle>
            <CardDescription>Documentation & Webhooks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-900 space-y-2">
               <p className="text-sm font-medium">Swagger / API Docs</p>
               <p className="text-xs text-muted-foreground mb-2">Powered by drf-spectacular</p>
               <Button size="sm" variant="secondary" className="w-full" onClick={() => window.open('#', '_blank')}>View Documentation</Button>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-zinc-100 dark:bg-zinc-900">
              <span className="text-sm font-medium">Sentry Error Tracking</span>
              <ToggleRight className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users size={18} /> User Management</CardTitle>
          <CardDescription>Manage platform access and roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-900 border-b text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                  <td className="px-4 py-3 font-medium">Admin User</td>
                  <td className="px-4 py-3">admin@openvision.com</td>
                  <td className="px-4 py-3"><span className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-2 py-1 rounded text-xs font-bold uppercase">Admin</span></td>
                  <td className="px-4 py-3 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                </tr>
                <tr className="bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                  <td className="px-4 py-3 font-medium">Security Guard</td>
                  <td className="px-4 py-3">guard@openvision.com</td>
                  <td className="px-4 py-3"><span className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 px-2 py-1 rounded text-xs font-bold uppercase">User</span></td>
                  <td className="px-4 py-3 text-right"><Button variant="ghost" size="sm" className="text-red-500">Revoke</Button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
