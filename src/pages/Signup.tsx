import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner";
import { FullScreenLoader } from "../components/ui/loader";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock network request
    setTimeout(() => {
      setIsLoading(false);
      login({ id: Date.now().toString(), name: name || "New User", email, role: "user" });
      toast.success("Account created successfully!");
      navigate("/");
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
          <p className="text-muted-foreground text-sm mt-1">Create an Account</p>
        </div>
        
        <Card className="border-purple-100 dark:border-purple-900 shadow-xl shadow-purple-900/5">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Join the computer vision platform
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Email</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
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
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Create account</Button>
              <div className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
