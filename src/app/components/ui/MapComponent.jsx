// "use client";

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix default marker icon globally (runs only once)
// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const MapComponent = () => {
//   const [isClient, setIsClient] = useState(false);

//   // Only render map on client side
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) return null;

//   const position = [31.515722772834973, 74.29475018734657];

//   // ✅ Use a key to force fresh map initialization on remounts
//   const mapKey = `map-${position[0]}-${position[1]}`;

//   return (
//     <MapContainer
//       key={mapKey} // important to prevent "already initialized" error
//       center={position}
//       zoom={15}
//       style={{
//         height: "350px",
//         width: "100%",
//         borderRadius: "12px",
//         overflow: "hidden",
//         zIndex: 0,
//       }}
//       scrollWheelZoom={false}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution=""
//       />
//       <Marker position={position}>
//         <Popup>
//           <strong>M.A Traders</strong>
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapComponent;
