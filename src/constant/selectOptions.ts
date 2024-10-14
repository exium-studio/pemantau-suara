const optionsAgama = [
  { value: 1, label: "Islam" },
  { value: 2, label: "Kristen" },
  { value: 3, label: "Katolik" },
  { value: 4, label: "Budha" },
  { value: 5, label: "Hindu" },
  { value: 6, label: "Konghucu" },
];

const optionsHubunganKeluarga = [
  { value: 1, label: "Ayah" },
  { value: 2, label: "Ibu" },
  { value: 3, label: "Anak" },
  { value: 4, label: "Suami" },
  { value: 5, label: "Istri" },
  { value: 6, label: "Nenek" },
  { value: 7, label: "Kakek" },
  { value: 8, label: "Ayah Suami" },
  { value: 9, label: "Ibu Suami" },
  { value: 10, label: "Ayah Istri" },
  { value: 11, label: "Ibu Istri" },
];

const optionsStatusHidup = [
  { value: 1, label: "Hidup" },
  { value: 0, label: "Meninggal" },
];

const optionsJenisKelamin = [
  {
    value: 1,
    label: "Laki - Laki",
  },
  {
    value: 0,
    label: "Perempuan",
  },
];

// Might  vary
const optionsInboxType = [
  {
    id: 1,
    label: "Cuti",
    link: "/beranda/cuti",
  },
  {
    id: 2,
    label: "Pengajuan Tukar Jadwal",
    link: "/beranda/tukar-jadwal?tabindex=0",
  },
  {
    id: 3,
    label: "Permintaan Tukar Jadwal",
    link: "/beranda/tukar-jadwal?tabindex=1",
  },
  {
    id: 4,
    label: "Lembur",
    link: "/beranda/lembur",
  },
  {
    id: 5,
    label: "Event & Diklat",
    link: "/beranda/event-diklat",
  },
  {
    id: 6,
    label: "Slip Gajiku",
    link: "/beranda/slip-gajiku",
  },
  {
    id: 7,
    label: "Dokumen",
    link: "/beranda/dokumen",
  },
  {
    id: 8,
    label: "Feedback",
    link: "/beranda/feedback",
  },
  {
    id: 9,
    label: "Laporan",
    link: "/beranda/laporan",
  },
  {
    id: 10,
    label: "Koperasi",
    link: "/beranda/koperasi",
  },
  {
    id: 11,
    label: "Perubahan Data",
    link: "/profil/edit/riwayat",
  },
  {
    id: 12,
    label: "Pengumuman",
    link: "/beranda/pengumuman",
  },
];

const optionsPendidikan = [
  {
    value: 1,
    label: "SD",
  },
  {
    value: 2,
    label: "SMP",
  },
  {
    value: 3,
    label: "SMA",
  },
  {
    value: 4,
    label: "SMK",
  },
  {
    value: 5,
    label: "Diploma 1 (D1)",
  },
  {
    value: 6,
    label: "Diploma 2 (D2)",
  },
  {
    value: 7,
    label: "Diploma 3 (D3)",
  },
  {
    value: 8,
    label: "Diploma 4 (D4) / Sarjana Terapan",
  },
  {
    value: 9,
    label: "Sarjana (S1)",
  },
  {
    value: 10,
    label: "Magister (S2)",
  },
  {
    value: 11,
    label: "Doktor (S3)",
  },
  {
    value: 12,
    label: "Pendidikan Non-Formal",
  },
];

const optionsStatusAktif = [
  {
    value: 1,
    label: "Belum Aktif",
  },
  {
    value: 2,
    label: "Aktif",
  },
  {
    value: 3,
    label: "Di-Non-Aktifkan",
  },
];

const optionsGoldar = [
  { value: 1, label: "A" },
  { value: 2, label: "B" },
  { value: 3, label: "AB" },
  { value: 4, label: "O" },
];

const optionsRole = [
  { value: 2, label: "Penanggung Jawab" },
  { value: 3, label: "Penggerak" },
];

const optionsKategoriSuara = [{ value: 1, label: "Pemilu" }];

const optionsLayer = [
  { value: 1, label: "Aktivitas" },
  { value: 2, label: "Suara KPU" },
];

export {
  optionsLayer,
  optionsKategoriSuara,
  optionsRole,
  optionsGoldar,
  optionsStatusAktif,
  optionsPendidikan,
  optionsStatusHidup,
  optionsAgama,
  optionsJenisKelamin,
  optionsInboxType,
  optionsHubunganKeluarga,
};
