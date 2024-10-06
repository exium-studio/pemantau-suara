import { StackProps } from "@chakra-ui/react";
// Custom Type

export type Type__ActivityInitialValues = {
  pelaksana?: Interface__SelectOption;
  kelurahan?: Interface__SelectOption;
  rw?: Interface__SelectOption;
  potensi_suara?: number;
  deskripsi?: string;
  tgl_mulai?: Date;
  tgl_selesai?: Date;
  tempat_aktivitas?: string;
  foto_aktivitas?: any;
};

export type Type__UserInitialValues = {
  foto_profil?: string;
  nama?: string;
  jenis_kelamin?: Interface__SelectOption;
  nik_ktp?: string;
  tgl_diangkat?: Date;
  no_hp?: string;
  role?: Interface__SelectOption;
  kelurahan?: Interface__SelectOption[];
  rw_pelaksana?: Interface__SelectOption[];
  newusername?: string;
  newpassword?: string;
};

// Base Interfaces

export interface Interface__FireToast {
  status?: "success" | "loading" | "info" | "warning" | "error";
  title: string;
  description?: string;
}

export interface Interface__Credentials {
  id: string;
  password: string;
}

export interface Interface__TableState {
  loading: boolean;
  error: boolean;
  data: any;
  retry: () => void;
  paginationData?: any;
  notFound?: boolean;
  loadingLoadMore?: boolean;
}

export interface Interface__SelectOption {
  value: any;
  label: string;
  label2?: string;
  original_data?: any;
}

export interface Interface__ChartDoughnut {
  datasets: {
    customTooltipLabels: string[];
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
    [key: string]: any;
  }[];
  labels?: string[];
  aspectRatio?: number;
  cutout?: string;
}

export interface Interface__ChartLine {
  datasets: {
    customTooltipLabels: string[] | number[];
    data: { x: string; y: number }[] | number[];
    backgroundColor: string[] | string;
    borderColor: string;
    borderWidth: number;
    fill?: boolean;
    tension?: number;
    [key: string]: any;
  }[];
  xLabel?: string;
  yLabel?: string;
  labels?: string[];
  aspectRatio?: number;
}

export interface Interface__TableRowOption {
  label: string | React.ReactNode;
  handleOnClick: (param: any) => void;
}

export interface Interface__FormattedTableHeader {
  column?: string;
  th: string;
  isSortable?: boolean;
  props?: any;
  cProps?: StackProps;
}

export interface Interface__FormattedTableBody {
  id: number;
  originalData?: any;
  columnsFormat: {
    column?: string;
    original_data?: any;
    value: any;
    td: any;
    isNumeric?: boolean; // default false
    isDate?: boolean; // default false
    isTime?: boolean; // default false
    props?: any;
    cProps?: StackProps;
  }[];
}

export interface Interface__User {
  id: number;
  nama: string;
  email: string;
  username?: string;
  email_verified_at: string | null;
  role_id: number | null;
  roles: Interface__Role[];
  foto_profil: string | null;
  status_aktif: number;
  created_at: string;
  updated_at: string | null;
}

export interface Interface__Pivot {
  model_type: string;
  model_id: number;
  role_id: number;
}

export interface Interface__Role {
  id: number;
  name: string;
  deskripsi: string;
  guard_name: string;
  created_at: Date | string;
  updated_at: Date | string | null;
  pivot: Interface__Pivot;
}

export interface Interface__ConstantTable {
  id: number | boolean | null;
  label: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}

export interface Interface__ColumnConfig {
  column: string;
  label: string;
}

export interface Interface__RowOption {
  callback: (row: any) => void;
  element: React.ReactNode;
}

export interface Interface__BatchAction {
  callback: (rowIds: number[]) => void;
  element: React.ReactNode;
}

// Other Interfaces
