"use client";

import { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line
} from 'recharts';
import { Paper, TaxonomyCategory } from '@/types';

interface ChartsProps {
  papers: Paper[];
  taxonomy: TaxonomyCategory[];
}

export function TimelineChart({ papers }: { papers: Paper[] }) {
  const data = useMemo(() => {
    const yearCounts: Record<string, number> = {};
    papers.forEach(p => {
      if (p.year) {
        yearCounts[p.year] = (yearCounts[p.year] || 0) + 1;
      }
    });
    return Object.entries(yearCounts)
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [papers]);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
          <XAxis dataKey="year" axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
          <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
          <Bar dataKey="count" fill="url(#colorUv)" radius={[4, 4, 0, 0]} name="Publicaciones" />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(220, 80%, 50%)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(220, 80%, 50%)" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryRadarChart({ papers, taxonomy }: ChartsProps) {
  const data = useMemo(() => {
    return taxonomy.map(cat => {
      const catPapers = papers.filter(p => p.category === cat.name);
      const avgScore = catPapers.length > 0 
        ? catPapers.reduce((sum, p) => sum + p.globalScore, 0) / catPapers.length 
        : 0;
      
      // Shorten names for the radar chart
      let shortName = cat.name;
      if (shortName.includes("&")) shortName = shortName.split("&")[0].trim();
      if (shortName.length > 15) shortName = shortName.substring(0, 15) + '...';

      return {
        subject: shortName,
        A: Math.round(avgScore),
        fullMark: 100,
      };
    }).filter(d => d.A > 0);
  }, [papers, taxonomy]);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid opacity={0.2} />
          <PolarAngleAxis dataKey="subject" tick={{fill: '#888', fontSize: 12}} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Score Promedio" dataKey="A" stroke="hsl(260, 70%, 55%)" fill="hsl(260, 70%, 55%)" fillOpacity={0.5} />
          <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrendLineChart({ papers }: { papers: Paper[] }) {
  const data = useMemo(() => {
    // A simplified trend line showing average citations per year
    const yearStats: Record<string, { totalCitations: number, count: number }> = {};
    papers.forEach(p => {
      if (p.year) {
        if (!yearStats[p.year]) yearStats[p.year] = { totalCitations: 0, count: 0 };
        yearStats[p.year].totalCitations += p.citationCount;
        yearStats[p.year].count += 1;
      }
    });
    
    return Object.entries(yearStats)
      .map(([year, stats]) => ({ 
        year, 
        avgCitations: Math.round(stats.totalCitations / stats.count) 
      }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [papers]);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
          <XAxis dataKey="year" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
          <Line type="monotone" dataKey="avgCitations" stroke="hsl(170, 75%, 45%)" strokeWidth={3} dot={{r: 4, fill: "hsl(170, 75%, 45%)", strokeWidth: 2, stroke: "#fff"}} activeDot={{r: 6}} name="Promedio de Citas" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
