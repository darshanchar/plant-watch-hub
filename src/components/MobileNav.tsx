import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, BarChart3, Bell, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const MobileNav = () => {
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
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-glass bg-white/25 border-t border-white/18 px-4 py-2 md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-irrigation-blue/20 text-irrigation-blue' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'text-irrigation-blue' : ''}`} />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
        
        <button
          onClick={handleLogout}
          className="flex flex-col items-center space-y-1 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNav;