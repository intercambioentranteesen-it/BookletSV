/**
 * Ubicación aproximada de cada experiencia en el mapa (latitud y longitud en grados decimales).
 * Es un punto representativo de la experiencia, no una dirección. Para las experiencias que recorren varios lugares
 * se usa un punto central. Revisar y corregir con el comité si algún punto no los representa bien.
 *
 *   VERIFICADO en fuentes (Wikipedia, NGA GeoNames, WWF): El Pital.
 *   APROXIMADO (conocimiento general, margen de pocos km): el resto.
 */
export const experienceGeoMock: Record<string, { lat: number; lon: number }> = {
  "surf-city": { lat: 13.4917, lon: -89.3869 }, // El Tunco
  "east-beaches": { lat: 13.1717, lon: -88.105 }, // El Cuco
  gulf: { lat: 13.28, lon: -87.85 }, // volcán Conchagua
  "flower-route": { lat: 13.855, lon: -89.79 }, // centro de la Ruta de las Flores (Juayúa – Apaneca – Ataco)
  "cerro-verde": { lat: 13.84, lon: -89.6 }, // entre Cerro Verde, Santa Ana y Coatepeque
  "san-salvador": { lat: 13.71, lon: -89.25 }, // ciudad y volcán de San Salvador
  archaeology: { lat: 13.87, lon: -89.49 }, // centro entre Joya de Cerén, San Andrés y Tazumal
  ilopango: { lat: 13.67, lon: -89.05 },
  suchitoto: { lat: 13.9388, lon: -89.0278 },
  "el-pital": { lat: 14.3833, lon: -89.1167 },
  "paz-route": { lat: 13.94, lon: -88.14 }, // Perquín, El Mozote y Arambala
  alegria: { lat: 13.4981, lon: -88.4911 },
};
