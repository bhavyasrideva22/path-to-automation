import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface ResultsRadarChartProps {
  data: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability_to_learn: number;
    real_world: number;
  };
}

export default function ResultsRadarChart({ data }: ResultsRadarChartProps) {
  const chartData = [
    { subject: 'Will', score: data.will, fullMark: 100 },
    { subject: 'Interest', score: data.interest, fullMark: 100 },
    { subject: 'Skill', score: data.skill, fullMark: 100 },
    { subject: 'Cognitive', score: data.cognitive, fullMark: 100 },
    { subject: 'Learning', score: data.ability_to_learn, fullMark: 100 },
    { subject: 'Real World', score: data.real_world, fullMark: 100 },
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid 
            stroke="hsl(var(--border))" 
            strokeOpacity={0.3}
          />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ 
              fill: 'hsl(var(--foreground))', 
              fontSize: 12,
              fontWeight: 500 
            }}
          />
          <PolarRadiusAxis 
            angle={0} 
            domain={[0, 100]} 
            tick={{
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 10
            }}
            tickFormatter={(value) => `${value}%`}
          />
          <Radar
            name="WISCAR Score"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ 
              r: 4, 
              fill: 'hsl(var(--primary))',
              strokeWidth: 2,
              stroke: 'hsl(var(--background))'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}