import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface RouteMapStop {
  day?:  number;
  name:  string;
  lat:   number;
  lng:   number;
}

interface Props {
  stops:      RouteMapStop[];
  className?: string;
}

// Auto-fit bounds on mount
function FitBounds({ stops }: { stops: RouteMapStop[] }) {
  const map = useMap();
  useEffect(() => {
    if (!stops.length) return;
    const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lng]));
    map.fitBounds(bounds, { padding: [48, 48] });
  }, [map, stops]);
  return null;
}

// Ctrl+scroll zoom guard
function CtrlWheelZoom() {
  const map = useMap();
  useEffect(() => {
    const el = map.getContainer();
    map.scrollWheelZoom.disable();
    const onWheel = (e: WheelEvent) => {
      e.ctrlKey ? map.scrollWheelZoom.enable() : map.scrollWheelZoom.disable();
    };
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Control') map.scrollWheelZoom.enable(); };
    const onKeyUp   = (e: KeyboardEvent) => { if (e.key === 'Control') map.scrollWheelZoom.disable(); };
    el.addEventListener('wheel', onWheel);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [map]);
  return null;
}

export default function TourRouteMap({ stops, className = '' }: Props) {
  const [routePath, setRoutePath] = useState<[number, number][] | null>(null);

  const directPath = useMemo<[number, number][]>(
    () => stops.map(s => [s.lat, s.lng]),
    [stops],
  );

  // Numbered teardrop pins matching the reference design
  const markerIcons = useMemo(
    () => stops.map((stop, i) =>
      L.divIcon({
        className:   'route-map-pin-wrapper',
        html:        `<span class="route-map-pin"><span class="route-map-pin-label">${stop.day ?? i + 1}</span></span>`,
        iconSize:    [30, 40],
        iconAnchor:  [15, 38],
        popupAnchor: [0, -38],
      }),
    ),
    [stops],
  );

  // Fetch OSRM road route
  useEffect(() => {
    if (stops.length < 2) return;
    let active = true;

    async function fetchRoute() {
      try {
        const coords = stops.map(s => `${s.lng},${s.lat}`).join(';');
        const res  = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`,
        );
        if (!res.ok) throw new Error('OSRM failed');
        const data = await res.json();
        const geom = data?.routes?.[0]?.geometry?.coordinates;
        if (!geom?.length) throw new Error('No geometry');
        const path = (geom as [number, number][]).map(([lng, lat]) => [lat, lng] as [number, number]);
        if (active) setRoutePath(path);
      } catch {
        if (active) setRoutePath(null);
      }
    }

    fetchRoute();
    return () => { active = false; };
  }, [stops]);

  if (!stops.length) return null;

  const displayPath = routePath && routePath.length > 1 ? routePath : directPath;

  return (
    <div className={`w-full rounded-2xl border border-stone overflow-hidden shadow-card ${className}`}>
      <MapContainer
        center={[stops[0].lat, stops[0].lng]}
        zoom={8}
        scrollWheelZoom={false}
        zoomControl={true}
        style={{ width: '100%', height: '360px' }}
        className="md:!h-[430px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds stops={stops} />
        <CtrlWheelZoom />

        {stops.map((stop, i) => (
          <Marker key={`${stop.name}-${i}`} position={[stop.lat, stop.lng]} icon={markerIcons[i]}>
            <Popup>
              <p className="font-semibold text-sm">{stop.name}</p>
              <p className="text-xs text-gray-500">Day {stop.day ?? i + 1}</p>
            </Popup>
          </Marker>
        ))}

        {displayPath.length > 1 && (
          <>
            {/* Outer dark stroke */}
            <Polyline
              positions={displayPath}
              pathOptions={{ color: '#1e3a5f', opacity: 0.95, weight: 8, lineCap: 'round', lineJoin: 'round' }}
            />
            {/* Inner bright stroke */}
            <Polyline
              positions={displayPath}
              pathOptions={{ color: '#2563eb', opacity: 0.95, weight: 5, lineCap: 'round', lineJoin: 'round' }}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
}
