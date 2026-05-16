import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DESTINATIONS = [
  { name: 'Sigiriya',      lat: 7.9570,  lng: 80.7603, icon: '🏰', desc: 'Rock Fortress' },
  { name: 'Kandy',         lat: 7.2906,  lng: 80.6337, icon: '🛕', desc: 'Temple of the Tooth' },
  { name: 'Nuwara Eliya',  lat: 6.9497,  lng: 80.7891, icon: '🌿', desc: 'Tea Country' },
  { name: 'Ella',          lat: 6.8667,  lng: 81.0466, icon: '⛰️', desc: 'Scenic Highlands' },
  { name: 'Yala',          lat: 6.3553,  lng: 81.5182, icon: '🐆', desc: 'Safari Park' },
  { name: 'Mirissa',       lat: 5.9483,  lng: 80.4549, icon: '🐋', desc: 'Whale Watching' },
  { name: 'Galle',         lat: 6.0535,  lng: 80.2210, icon: '🏯', desc: 'Dutch Fort' },
  { name: 'Colombo',       lat: 6.9271,  lng: 79.8612, icon: '🏙️', desc: 'Capital City' },
  { name: 'Anuradhapura',  lat: 8.3114,  lng: 80.4037, icon: '🌸', desc: 'Ancient Kingdom' },
  { name: 'Polonnaruwa',   lat: 7.9395,  lng: 81.0001, icon: '🗿', desc: 'Medieval Kingdom' },
  { name: 'Trincomalee',   lat: 8.5874,  lng: 81.2152, icon: '🌊', desc: 'East Coast Gem' },
  { name: 'Dambulla',      lat: 7.8567,  lng: 80.6517, icon: '🪨', desc: 'Cave Temple' },
  { name: 'Udawalawe',     lat: 6.4756,  lng: 80.8898, icon: '🐘', desc: 'Elephant Safari' },
  { name: 'Wilpattu',      lat: 8.4527,  lng: 80.0416, icon: '🐅', desc: 'Leopard Country' },
  { name: 'Sinharaja',     lat: 6.4012,  lng: 80.4016, icon: '🌳', desc: 'UNESCO Rainforest' },
  { name: 'Negombo',       lat: 7.2095,  lng: 79.8378, icon: '✈️', desc: 'Gateway & Beach' },
  { name: 'Mihintale',     lat: 8.3500,  lng: 80.5100, icon: '☸️', desc: 'Buddhist Sacred Site' },
  { name: 'Bentota',       lat: 6.4214,  lng: 80.0020, icon: '🏖️', desc: 'Beach & River' },
];

function makeIcon(emoji: string) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:36px;height:36px;border-radius:50%;
        background:linear-gradient(135deg,#1B3A2D,#267d5d);
        border:2px solid #C9A84C;
        display:flex;align-items:center;justify-content:center;
        font-size:15px;box-shadow:0 2px 8px rgba(0,0,0,0.35);
        cursor:pointer;
      ">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
}

function FitSriLanka() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds([[5.9, 79.6], [9.9, 81.9]], { padding: [24, 24] });
    map.scrollWheelZoom.disable();
    const el = map.getContainer();
    const onWheel = (e: WheelEvent) => {
      e.ctrlKey ? map.scrollWheelZoom.enable() : map.scrollWheelZoom.disable();
    };
    el.addEventListener('wheel', onWheel);
    return () => el.removeEventListener('wheel', onWheel);
  }, [map]);
  return null;
}

export default function DestinationMap() {
  return (
    <MapContainer
      center={[7.8731, 80.7718]}
      zoom={7}
      style={{ height: '580px', width: '100%', borderRadius: '1.5rem' }}
      zoomControl={true}
      attributionControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        maxZoom={19}
      />
      <FitSriLanka />
      {DESTINATIONS.map(d => (
        <Marker key={d.name} position={[d.lat, d.lng]} icon={makeIcon(d.icon)}>
          <Popup>
            <div style={{ textAlign: 'center', minWidth: '120px', fontFamily: 'Inter, sans-serif' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>{d.icon}</div>
              <div style={{ fontWeight: 700, color: '#1B3A2D', fontSize: '14px' }}>{d.name}</div>
              <div style={{ color: '#C9A84C', fontSize: '11px', marginTop: '2px' }}>{d.desc}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
