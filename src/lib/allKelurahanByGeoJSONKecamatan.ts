export default function allKelurahanByGeoJSONKecamatan(
  geoJSONKecamatan: any[]
) {
  return geoJSONKecamatan?.flatMap((kecamatan: any) =>
    kecamatan?.features?.map((kelurahan: any) => ({
      value: kelurahan?.properties?.village_code || "-",
      label: kelurahan?.properties?.village || "-",
    }))
  );
}
