export default function LocationMap({ query }: { query: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=13&output=embed`;

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-border">
      <iframe
        src={src}
        title={`${query} 위치 지도`}
        width="100%"
        height="240"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
