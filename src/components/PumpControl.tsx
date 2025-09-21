import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Power, Zap, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PumpControlProps {
  autoMode: boolean;
  pumpStatus: boolean;
  onPumpToggle: (status: boolean) => void;
  onAutoModeToggle: (mode: boolean) => void;
}

export const PumpControl = ({ 
  autoMode, 
  pumpStatus, 
  onPumpToggle, 
  onAutoModeToggle 
}: PumpControlProps) => {
  const { toast } = useToast();

  const handlePumpToggle = () => {
    if (autoMode) {
      toast({
        title: "Auto Mode Active",
        description: "Switch to manual mode to control pump manually",
        variant: "destructive",
      });
      return;
    }
    
    const newStatus = !pumpStatus;
    onPumpToggle(newStatus);
    
    toast({
      title: `Pump ${newStatus ? 'Started' : 'Stopped'}`,
      description: `Irrigation pump is now ${newStatus ? 'ON' : 'OFF'}`,
    });
  };

  const handleAutoModeToggle = () => {
    const newMode = !autoMode;
    onAutoModeToggle(newMode);
    
    toast({
      title: `${newMode ? 'Auto' : 'Manual'} Mode Activated`,
      description: `Pump control switched to ${newMode ? 'automatic' : 'manual'} mode`,
    });
  };

  return (
    <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)] animate-slide-up" style={{animationDelay: '0.5s'}}>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-sm font-medium">Pump Control</CardTitle>
          <CardDescription className="text-xs">Manual & Auto Mode</CardDescription>
        </div>
        <div className={`p-2 rounded-full ${pumpStatus ? 'animate-pulse-green' : ''}`}>
          <Power className={`h-5 w-5 ${pumpStatus ? 'text-success' : 'text-muted-foreground'}`} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Auto Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Auto Mode</span>
          </div>
          <Switch 
            checked={autoMode} 
            onCheckedChange={handleAutoModeToggle} 
          />
        </div>

        {/* Pump Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge 
            variant={pumpStatus ? "default" : "secondary"}
            className={pumpStatus ? "bg-success text-success-foreground" : ""}
          >
            {pumpStatus ? "Running" : "Stopped"}
          </Badge>
        </div>

        {/* Manual Control Button */}
        <Button
          onClick={handlePumpToggle}
          disabled={autoMode}
          className={`w-full transition-all duration-300 ${
            pumpStatus 
              ? "bg-destructive hover:bg-destructive/90" 
              : "bg-success hover:bg-success/90"
          }`}
          size="lg"
        >
          <div className="flex items-center space-x-2">
            {pumpStatus ? (
              <Power className="h-4 w-4" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
            <span>
              {autoMode 
                ? "Auto Control Active" 
                : pumpStatus 
                  ? "Stop Pump" 
                  : "Start Pump"
              }
            </span>
          </div>
        </Button>

        {autoMode && (
          <div className="text-xs text-center text-muted-foreground bg-irrigation-light-green/20 p-2 rounded">
            <Zap className="h-3 w-3 inline mr-1" />
            Pump controlled automatically based on soil moisture levels
          </div>
        )}
      </CardContent>
    </Card>
  );
};