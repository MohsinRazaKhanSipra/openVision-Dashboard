import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Upload, Settings, Play, Box, Layers, Cpu } from "lucide-react";
import { toast } from "sonner";
import { FullScreenLoader } from "../components/ui/loader";

interface AIModel {
  id: string;
  name: string;
  type: string;
  version: string;
  status: "ready" | "loading" | "error";
  accuracy: number;
}

export function Models() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setModels([
        { id: "1", name: "YOLOv8-Nano", type: "Object Detection", version: "8.0", status: "ready", accuracy: 89.4 },
        { id: "2", name: "YOLOv8-Large", type: "Object Detection", version: "8.0", status: "ready", accuracy: 96.2 },
        { id: "3", name: "YOLO11-Face", type: "Facial Recognition", version: "11.1", status: "error", accuracy: 0 },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setModels([...models, { 
        id: Date.now().toString(), 
        name: "Custom-YOLO-Weights", 
        type: "Custom", 
        version: "1.0", 
        status: "ready", 
        accuracy: 92.1 
      }]);
      setUploading(false);
      toast.success("Model weights uploaded and configured successfully!");
    }, 2500);
  };

  if (isLoading) return <FullScreenLoader isLoading={true} />;

  return (
    <div className="space-y-6">
      <FullScreenLoader isLoading={uploading} />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Models</h2>
          <p className="text-muted-foreground">Manage and configure YOLO models for computer vision tasks.</p>
        </div>
        <Button onClick={handleUpload} className="gap-2 bg-purple-600 hover:bg-purple-700">
          <Upload size={16} /> Upload Weights (.pt)
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Active Models */}
        <div className="md:col-span-2 space-y-4">
          {models.map(model => (
            <Card key={model.id} className="overflow-hidden border-l-4 border-l-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Box size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {model.name}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          model.status === 'ready' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
                          model.status === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' :
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400'
                        }`}>
                          {model.status}
                        </span>
                      </h3>
                      <p className="text-sm text-muted-foreground">{model.type} • v{model.version}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{model.accuracy}%</p>
                      <p className="text-xs text-muted-foreground">mAP@50-95</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1"><Settings size={14}/> Config</Button>
                      <Button size="sm" variant={model.status === 'ready' ? 'default' : 'secondary'} className="gap-1 bg-purple-600 hover:bg-purple-700 text-white">
                        <Play size={14}/> Deploy
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Configuration Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Settings size={18} /> Global Config</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Confidence Threshold</label>
                <div className="flex items-center gap-4">
                  <input type="range" className="flex-1 accent-purple-600" min="0" max="100" defaultValue="45" />
                  <span className="w-12 text-right font-mono text-sm">0.45</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">IoU Threshold</label>
                <div className="flex items-center gap-4">
                  <input type="range" className="flex-1 accent-purple-600" min="0" max="100" defaultValue="70" />
                  <span className="w-12 text-right font-mono text-sm">0.70</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hardware Inference</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm">
                  <option>CUDA (NVIDIA GPU)</option>
                  <option>TensorRT</option>
                  <option>CPU</option>
                </select>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-2">Save Parameters</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Layers size={18} /> Pre-trained Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Download official Ultralytics weights to your instance.</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between group">
                  YOLOv8-Medium <Cpu size={14} className="text-muted-foreground group-hover:text-purple-600"/>
                </Button>
                <Button variant="outline" className="w-full justify-between group">
                  YOLOv8-XLarge <Cpu size={14} className="text-muted-foreground group-hover:text-purple-600"/>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
