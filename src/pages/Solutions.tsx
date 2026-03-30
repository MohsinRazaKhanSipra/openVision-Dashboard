import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Activity, Camera, Link as LinkIcon, Users, BoxSelect, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { FullScreenLoader } from "../components/ui/loader";
import { Link } from "react-router-dom";

export function Solutions() {
  const [isLoading, setIsLoading] = useState(true);
  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const handleDeploy = (solution: string) => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      toast.success(`${solution} solution deployed successfully on selected camera!`);
    }, 2000);
  };

  const solutions = [
    {
      id: "sol-1",
      title: "People Counting & Analytics",
      description: "Detects and counts people in the frame using YOLOv8. Ideal for retail stores and event monitoring.",
      icon: Users,
      model: "YOLOv8-Nano (Person class only)",
      active: true,
      camera: "Front Entrance"
    },
    {
      id: "sol-2",
      title: "Vehicle License Plate Recognition",
      description: "Identifies vehicle types and reads license plates using OCR + YOLO. Good for parking lots.",
      icon: BoxSelect,
      model: "YOLOv8-Medium (Vehicle) + OCR",
      active: false,
      camera: null
    },
    {
      id: "sol-3",
      title: "PPE Compliance Monitoring",
      description: "Ensures workers are wearing hard hats and safety vests in construction zones.",
      icon: AlertCircle,
      model: "Custom-YOLO-Weights",
      active: false,
      camera: null
    }
  ];

  if (isLoading) return <FullScreenLoader isLoading={true} />;

  return (
    <div className="space-y-6">
      <FullScreenLoader isLoading={deploying} />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Solutions Hub</h2>
          <p className="text-muted-foreground">Deploy pre-configured computer vision pipelines to your cameras.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((sol) => (
          <Card key={sol.id} className="flex flex-col h-full border-t-4 border-t-purple-600 hover:shadow-lg hover:shadow-purple-500/10 transition-all group">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <sol.icon size={24} />
              </div>
              <CardTitle>{sol.title}</CardTitle>
              <CardDescription>{sol.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end gap-6 mt-auto">
              <div className="space-y-3 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-lg border border-purple-100 dark:border-purple-900/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Model</span>
                  <span className="font-mono bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-2 py-0.5 rounded text-xs">{sol.model}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Camera Target</span>
                  {sol.active ? (
                    <span className="flex items-center gap-1 font-medium text-green-600 dark:text-green-400">
                      <Camera size={14} /> {sol.camera}
                    </span>
                  ) : (
                    <select className="text-xs bg-transparent border-b border-dashed border-purple-300 dark:border-purple-700 focus:outline-none focus:border-purple-500">
                      <option value="">Select Camera...</option>
                      <option value="1">Front Entrance</option>
                      <option value="2">Warehouse B</option>
                      <option value="3">Parking Lot</option>
                    </select>
                  )}
                </div>
              </div>

              {sol.active ? (
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950">Stop</Button>
                  <Link to="/cameras/1" className="flex-1">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 gap-2"><Activity size={16}/> View Live</Button>
                  </Link>
                </div>
              ) : (
                <Button onClick={() => handleDeploy(sol.title)} className="w-full bg-purple-600 hover:bg-purple-700 gap-2">
                  <LinkIcon size={16}/> Deploy Pipeline
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
