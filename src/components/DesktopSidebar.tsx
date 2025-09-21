import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  BarChart3, 
  Bell, 
  LogOut, 
  Droplets, 
  Leaf,
  Settings 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DesktopSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/reports", icon: BarChart3, label: "Reports" },
    { path: "/notifications", icon: Bell, label: "Notifications", badge: 2 },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  return (
    <div className="hidden md:flex w-64 min-h-screen backdrop-blur-glass bg-white/25 border-r border-white/18 flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/18">
        <div className="flex items-center space-x-2 mb-2">
          <div className="relative">
            <Droplets className="h-8 w-8 text-irrigation-blue animate-float" />
            <Leaf className="h-6 w-6 text-irrigation-green absolute -top-1 -right-1" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Smart Irrigation
            </h2>
            <p className="text-xs text-muted-foreground">Control Center</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start space-x-3 h-12 ${
                  isActive 
                    ? 'bg-gradient-primary text-primary-foreground shadow-lg' 
                    : 'hover:bg-white/10 text-foreground'
                }`}
                onClick={() => navigate(item.path)}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>
      </div>

      <Separator className="mx-4 bg-white/18" />

      {/* Bottom Section */}
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start space-x-3 h-12 hover:bg-white/10"
          onClick={() => {
            toast({
              title: "Settings",
              description: "Settings panel coming soon",
            });
          }}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start space-x-3 h-12 hover:bg-destructive/10 text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default DesktopSidebar;