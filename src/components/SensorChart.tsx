import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface SensorChartProps {
  title: string;
  data: any[];
  color: string;
  multiSeries?: boolean;
}

export const SensorChart = ({ title, data, color, multiSeries = false }: SensorChartProps) => {
  return (
    <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)] animate-slide-up">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription>Real-time sensor data visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }}
              />
              
              {multiSeries ? (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="hsl(var(--irrigation-pump))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--irrigation-pump))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--irrigation-pump))", strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="humidity" 
                    stroke="hsl(var(--irrigation-blue))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--irrigation-blue))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--irrigation-blue))", strokeWidth: 2 }}
                  />
                </>
              ) : (
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  strokeWidth={3}
                  dot={{ fill: color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                />
              )}
              
              {/* Reference lines for optimal ranges */}
              {title.includes("Soil Moisture") && (
                <>
                  <ReferenceLine y={30} stroke="hsl(var(--destructive))" strokeDasharray="5 5" />
                  <ReferenceLine y={60} stroke="hsl(var(--success))" strokeDasharray="5 5" />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};