import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Droplets, Thermometer, Gauge, Waves, Power, Settings } from "lucide-react";
import { SensorChart } from "@/components/SensorChart";
import { PumpControl } from "@/components/PumpControl";

interface SensorData {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  tankLevel: number;
  flowRate: number;
  timestamp: Date;
}

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    soilMoisture: 65,
    temperature: 24,
    humidity: 78,
    tankLevel: 85,
    flowRate: 2.3,
    timestamp: new Date(),
  });

  const [autoMode, setAutoMode] = useState(true);
  const [pumpStatus, setPumpStatus] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        soilMoisture: Math.max(10, Math.min(100, prev.soilMoisture + (Math.random() - 0.5) * 5)),
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(30, Math.min(100, prev.humidity + (Math.random() - 0.5) * 3)),
        tankLevel: Math.max(0, Math.min(100, prev.tankLevel + (Math.random() - 0.5) * 2)),
        flowRate: Math.max(0, Math.min(5, prev.flowRate + (Math.random() - 0.5) * 0.5)),
        timestamp: new Date(),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSensorStatus = (value: number, type: string) => {
    if (type === 'soilMoisture') {
      if (value < 30) return { label: 'Low', color: 'destructive' };
      if (value < 60) return { label: 'Medium', color: 'warning' };
      return { label: 'Good', color: 'success' };
    }
    if (type === 'tankLevel') {
      if (value < 20) return { label: 'Low', color: 'destructive' };
      if (value < 50) return { label: 'Medium', color: 'warning' };
      return { label: 'Full', color: 'success' };
    }
    return { label: 'Normal', color: 'success' };
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">Real-time irrigation system monitoring</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Auto Mode</span>
            <Switch checked={autoMode} onCheckedChange={setAutoMode} />
          </div>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
            pumpStatus ? 'bg-success/20 text-success' : 'bg-muted/50 text-muted-foreground'
          }`}>
            <Power className="h-4 w-4" />
            <span className="text-sm font-medium">
              Pump {pumpStatus ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </div>

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Soil Moisture */}
        <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)] animate-slide-up">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
            <Droplets className="h-4 w-4 text-irrigation-blue ml-auto" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.soilMoisture.toFixed(1)}%</div>
            <Progress value={sensorData.soilMoisture} className="mt-2" />
            <div className="flex justify-between items-center mt-2">
              <Badge variant={getSensorStatus(sensorData.soilMoisture, 'soilMoisture').color as any}>
                {getSensorStatus(sensorData.soilMoisture, 'soilMoisture').label}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {sensorData.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Temperature */}
        <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)] animate-slide-up" style={{animationDelay: '0.1s'}}>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-irrigation-pump ml-auto" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.temperature.toFixed(1)}°C</div>
            <Progress value={(sensorData.temperature / 40) * 100} className="mt-2" />
            <div className="flex justify-between items-center mt-2">
              <Badge variant="outline">Normal</Badge>
              <span className="text-xs text-muted-foreground">
                {sensorData.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Humidity */}
        <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)] animate-slide-up" style={{animationDelay: '0.2s'}}>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
            <Gauge className="h-4 w-4 text-irrigation-blue ml-auto" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.humidity.toFixed(1)}%</div>
            <Progress value={sensorData.humidity} className="mt-2" />
            <div className="flex justify-between items-center mt-2">
              <Badge variant="outline">Normal</Badge>
              <span className="text-xs text-muted-foreground">
                {sensorData.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Tank Level */}
        <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)] animate-slide-up" style={{animationDelay: '0.3s'}}>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tank Level</CardTitle>
            <Waves className="h-4 w-4 text-irrigation-water ml-auto" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.tankLevel.toFixed(1)}%</div>
            <Progress value={sensorData.tankLevel} className="mt-2" />
            <div className="flex justify-between items-center mt-2">
              <Badge variant={getSensorStatus(sensorData.tankLevel, 'tankLevel').color as any}>
                {getSensorStatus(sensorData.tankLevel, 'tankLevel').label}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {sensorData.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Flow Rate */}
        <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)] animate-slide-up" style={{animationDelay: '0.4s'}}>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flow Rate</CardTitle>
            <Droplets className="h-4 w-4 text-irrigation-green ml-auto" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.flowRate.toFixed(1)} L/min</div>
            <Progress value={(sensorData.flowRate / 5) * 100} className="mt-2" />
            <div className="flex justify-between items-center mt-2">
              <Badge variant="outline">Active</Badge>
              <span className="text-xs text-muted-foreground">
                {sensorData.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Pump Control */}
        <PumpControl 
          autoMode={autoMode}
          pumpStatus={pumpStatus}
          onPumpToggle={setPumpStatus}
          onAutoModeToggle={setAutoMode}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SensorChart
          title="Soil Moisture Trend"
          data={[
            { time: '12:00', value: 68 },
            { time: '12:15', value: 65 },
            { time: '12:30', value: 62 },
            { time: '12:45', value: 59 },
            { time: '13:00', value: sensorData.soilMoisture },
          ]}
          color="hsl(var(--irrigation-green))"
        />
        
        <SensorChart
          title="Temperature & Humidity"
          data={[
            { time: '12:00', temperature: 22, humidity: 75 },
            { time: '12:15', temperature: 23, humidity: 76 },
            { time: '12:30', temperature: 24, humidity: 77 },
            { time: '12:45', temperature: 23.5, humidity: 78 },
            { time: '13:00', temperature: sensorData.temperature, humidity: sensorData.humidity },
          ]}
          color="hsl(var(--irrigation-blue))"
          multiSeries
        />
      </div>
    </div>
  );
};

export default Dashboard;