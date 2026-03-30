import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner";
import { FullScreenLoader } from "../components/ui/loader";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock network request
    setTimeout(() => {
      setIsLoading(false);
      if (email === "admin@openvision.com" && password === "admin") {
        login({ id: "1", name: "Admin User", email, role: "admin" });
        toast.success("Welcome back, Admin!");
        navigate("/");
      } else if (email && password) {
        login({ id: "2", name: "Standard User", email, role: "user" });
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <FullScreenLoader isLoading={isLoading} />
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
            <span className="text-3xl font-bold tracking-tighter">oV</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">openVision Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Computer Vision Platform</p>
        </div>
        
        <Card className="border-purple-100 dark:border-purple-900 shadow-xl shadow-purple-900/5">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Admin test: admin@openvision.com / admin
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Email</label>
                <Input
                  type="email"
                  placeholder="admin@openvision.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Sign in</Button>
              <div className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-purple-600 hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
