import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Plus, Video, Play, Settings, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { FullScreenLoader } from "../components/ui/loader";

interface Camera {
  id: string;
  name: string;
  status: "active" | "offline";
  url: string;
}

export function Cameras() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newCamName, setNewCamName] = useState("");
  const [newCamUrl, setNewCamUrl] = useState("");

  useEffect(() => {
    // Load mock data
    setTimeout(() => {
      setCameras([
        { id: "1", name: "Front Entrance", status: "active", url: "https://www.youtube.com/watch?v=1EiC9bvVGnk" },
        { id: "2", name: "Warehouse B", status: "active", url: "https://www.youtube.com/watch?v=LXb3EKWsInQ" },
        { id: "3", name: "Parking Lot", status: "offline", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCamName || !newCamUrl) return;
    
    const newCam: Camera = {
      id: Date.now().toString(),
      name: newCamName,
      status: "active",
      url: newCamUrl,
    };
    
    setCameras([...cameras, newCam]);
    setShowAdd(false);
    setNewCamName("");
    setNewCamUrl("");
    toast.success("Camera added successfully");
  };

  const handleDelete = (id: string) => {
    setCameras(cameras.filter(c => c.id !== id));
    toast.success("Camera removed");
  };

  if (isLoading) return <FullScreenLoader isLoading={true} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Cameras</h2>
          <p className="text-muted-foreground">Manage your RTSP streams and video feeds.</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gap-2 bg-purple-600 hover:bg-purple-700">
          <Plus size={16} /> Add Camera
        </Button>
      </div>

      {showAdd && (
        <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/10">
          <CardHeader>
            <CardTitle>Add New Camera Stream</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="flex gap-4 items-end">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Camera Name</label>
                <Input placeholder="e.g., Back Door" value={newCamName} onChange={e => setNewCamName(e.target.value)} />
              </div>
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Stream URL (YouTube for Mock)</label>
                <Input placeholder="https://youtube.com/..." value={newCamUrl} onChange={e => setNewCamUrl(e.target.value)} />
              </div>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Save</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cameras.map(cam => (
          <Card key={cam.id} className="overflow-hidden hover:border-purple-400 dark:hover:border-purple-600 transition-colors group">
            <div className="h-40 bg-zinc-200 dark:bg-zinc-800 relative flex items-center justify-center border-b">
              {cam.status === "active" ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                   <Video className="text-white/50 w-12 h-12" />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                  <span className="text-zinc-500 font-medium">Stream Offline</span>
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${cam.status === 'active' ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                  {cam.status.toUpperCase()}
                </span>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{cam.name}</h3>
                  <p className="text-xs text-muted-foreground truncate w-48">{cam.url}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Link to={`/cameras/${cam.id}`} state={{ camera: cam }}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Play size={14} /> View Feed
                  </Button>
                </Link>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-purple-600">
                    <Settings size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(cam.id)} className="h-8 w-8 text-muted-foreground hover:text-red-500">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
