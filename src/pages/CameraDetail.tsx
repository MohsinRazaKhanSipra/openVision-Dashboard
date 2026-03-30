import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, Maximize2, Settings2, ShieldAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useEffect, useState } from "react";
import { FullScreenLoader } from "../components/ui/loader";

export function CameraDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const camera = location.state?.camera || { 
    name: "Camera Stream", 
    url: "https://www.youtube.com/watch?v=1EiC9bvVGnk",
    status: "active" 
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <FullScreenLoader isLoading={true} />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full hover:bg-purple-100 dark:hover:bg-purple-900">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{camera.name}</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            ID: {id} • <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" className="gap-2"><Settings2 size={16}/> Configure Stream</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 gap-2"><ShieldAlert size={16}/> View Detections</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden border-zinc-800 bg-black">
          <div className="aspect-video relative group">
            <iframe
              src={camera.url.replace('watch?v=', 'embed/')}
              title={camera.name}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-mono flex items-center gap-2 backdrop-blur-md pointer-events-none">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
               REC
            </div>
            <Button variant="ghost" size="icon" className="absolute bottom-4 right-4 bg-black/50 text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
              <Maximize2 size={16} />
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stream Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Resolution</span>
                <span className="font-mono">1920x1080</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Codec</span>
                <span className="font-mono">H.264</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">FPS</span>
                <span className="font-mono">30.0</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Bitrate</span>
                <span className="font-mono">4.5 Mbps</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-lg text-purple-600 dark:text-purple-400">Active Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/50">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">People Counting</p>
                    <p className="text-xs text-muted-foreground">YOLOv8-Nano</p>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded">Running</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
