type Stat = {
  value: string;
  label: string;
};

export default function StatTiles({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 border-b border-border pb-8 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg bg-ivory p-4">
          <p className="text-[20px] font-semibold text-forest">{stat.value}</p>
          <p className="mt-0.5 text-[12px] text-text-soft">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
