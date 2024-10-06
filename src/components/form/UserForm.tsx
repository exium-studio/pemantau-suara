import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { Interface__SelectOption } from "../../constant/interfaces";
import useRequest from "../../hooks/useRequest";
import { generateUsernameByName } from "../../lib/generateUsernameByName";
import MultiSelectKelurahan from "../dependent/dedicated/MultiSelectKelurahan";
import SelectGender from "../dependent/dedicated/SelectGender";
import SelectRole from "../dependent/dedicated/SelectRole";
import DatePickerModal from "../dependent/input/DatePickerModal";
import PasswordInput from "../dependent/input/PasswordInput";
import StringInput from "../dependent/input/StringInput";
import RequiredForm from "./RequiredForm";
import createNumberArraybyGivenMaxNumber from "../../lib/createNumberArraybyGivenMaxNumber";
import MultiSelectRW from "../dependent/dedicated/MultiSelectRW";
import formatDate from "../../lib/formatDate";

type Type__InitialValues = {
  foto_profil?: string;
  nama?: string;
  jenis_kelamin?: Interface__SelectOption;
  nik_ktp?: string;
  tgl_diangkat?: Date;
  no_hp?: string;
  role?: Interface__SelectOption;
  kelurahan?: Interface__SelectOption[];
  rw?: Interface__SelectOption[];
  newusername?: string;
  newpassword?: string;
};

const defaultValues = {
  foto_profil: "",
  nama: "",
  jenis_kelamin: undefined,
  nik_ktp: "",
  tgl_diangkat: undefined,
  no_hp: "",
  role: undefined,
  kelurahan: undefined,
  rw: undefined,
  newusername: "",
  newpassword: "bocahe_dewe",
};

interface Props {
  initialValues?: Type__InitialValues;
  excludeFields?: string[];
}

export default function UserForm({
  initialValues = defaultValues,
  excludeFields,
}: Props) {
  // States
  const [RWOptions, setRWOptions] = useState<
    Interface__SelectOption[] | undefined
  >(undefined);

  // Utils
  const { req, loading } = useRequest();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: yup.object().shape({
      nama: yup.string().required("Harus diisi"),
      jenis_kelamin: yup.object().required("Harus diisi"),
      nik_ktp: yup
        .string()
        .required("Harus diisi")
        .length(16, "NIK KTP harus 16 karakter"),
      tgl_diangkat: yup.date().required("Harus diisi"),
      no_hp: yup.string().required("Harus diisi"),
      role: yup.object().required("Harus diisi"),
      kelurahan: yup
        .mixed()
        .required("Harus diisi")
        .test(
          "max-array-size-based-on-role",
          "Maksimal 1 kelurahan",
          function (value) {
            const { role } = this.parent as { role: Interface__SelectOption };
            // Jika role.value === 3, pastikan kelurahan maksimal hanya 1 elemen
            if (role?.value === 3) {
              return Array.isArray(value) && value.length <= 1; // Max 1 element if role.value is 3
            }
            return true; // Skip check if role.value is not 3
          }
        ),
      rw: yup
        .mixed()
        .test("is-required-based-on-role", "Harus diisi", function (value) {
          const { role } = this.parent as { role: Interface__SelectOption };
          // Hanya require 'rw' jika role.value bukan 2
          if (role?.value !== 2) {
            return !!value; // Return true if value is present
          }
          return true; // If role.value is 2, skip the required check
        }),
      newusername: yup.string().required("Harus diisi"),
      newpassword: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      const url = `/api/pemantau-suara/dashboard/management/pengguna`;

      const payload = {
        foto_profil: values?.foto_profil,
        nama: values?.nama,
        jenis_kelamin: values?.jenis_kelamin?.value,
        nik_ktp: values?.nik_ktp,
        tgl_diangkat: formatDate(values?.tgl_diangkat, "short2"),
        no_hp: values?.no_hp,
        role_id: values?.role?.value,
        kelurahan_id: values?.kelurahan?.map(
          (kelurahan: any) => kelurahan.value
        ),
        rw: values?.rw,
        username: values?.newusername,
        password: values?.newpassword,
      };

      const config = {
        url,
        method: "post",
        data: payload,
      };

      req({ config });
    },
  });
  const formikRef = useRef(formik);

  // Handle value username by inputted nama
  useEffect(() => {
    formikRef.current.setFieldValue(
      "newusername",
      generateUsernameByName(formik.values.nama)
    );
  }, [formik.values.nama]);

  // Handle RWOptions by kelurahan
  useEffect(() => {
    const RWOptions = createNumberArraybyGivenMaxNumber(
      formik.values.kelurahan?.[0]?.original_data?.max_data
    )?.map((rw) => ({
      value: rw,
      label: rw.toString(),
    }));
    setRWOptions(RWOptions);
  }, [formik.values.kelurahan]);

  return (
    <>
      <form id="addUserForm" onSubmit={formik.handleSubmit}>
        {/* Nama */}
        <FormControl mb={4} isInvalid={!!formik.errors?.nama}>
          <FormLabel>
            Nama Lengkap
            <RequiredForm />
          </FormLabel>
          <StringInput
            name="nama"
            onChangeSetter={(input) => {
              formik.setFieldValue("nama", input);
            }}
            inputValue={formik.values.nama}
            placeholder="Jolitos Kurniawan"
          />
          <FormErrorMessage>{formik.errors.nama as string}</FormErrorMessage>
        </FormControl>

        {/* Jenis kelamin */}
        <FormControl mb={4} isInvalid={!!formik.errors?.jenis_kelamin}>
          <FormLabel>
            Jenis Kelamin
            <RequiredForm />
          </FormLabel>
          <SelectGender
            name="jenis_kelamin"
            onConfirm={(input) => {
              formik.setFieldValue("jenis_kelamin", input);
            }}
            inputValue={formik.values.jenis_kelamin}
            isError={!!formik.errors.jenis_kelamin}
          />
          <FormErrorMessage>
            {formik.errors.jenis_kelamin as string}
          </FormErrorMessage>
        </FormControl>

        {/* NIK */}
        <FormControl mb={4} isInvalid={!!formik.errors?.nik_ktp}>
          <FormLabel>
            NIK
            <RequiredForm />
          </FormLabel>
          <StringInput
            name="nik_ktp"
            onChangeSetter={(input) => {
              formik.setFieldValue("nik_ktp", input);
            }}
            inputValue={formik.values.nik_ktp}
            placeholder="331**************"
          />
          <FormErrorMessage>{formik.errors.nik_ktp as string}</FormErrorMessage>
        </FormControl>

        {/* Tanggal diangkat */}
        <FormControl mb={4} isInvalid={!!formik.errors?.tgl_diangkat}>
          <FormLabel>
            Tanggal Diangkat
            <RequiredForm />
          </FormLabel>
          <DatePickerModal
            id={`add-user`}
            name="tgl_diangkat"
            onConfirm={(input) => {
              formik.setFieldValue("tgl_diangkat", input);
            }}
            inputValue={formik.values.tgl_diangkat}
            isError={!!formik.errors.tgl_diangkat}
            placeholder="Tanggal Diangkat"
          />
          <FormErrorMessage>
            {formik.errors.tgl_diangkat as string}
          </FormErrorMessage>
        </FormControl>

        {/* No.Telp */}
        <FormControl mb={4} isInvalid={!!formik.errors?.no_hp}>
          <FormLabel>
            No.Telp
            <RequiredForm />
          </FormLabel>
          <StringInput
            name="no_hp"
            onChangeSetter={(input) => {
              formik.setFieldValue("no_hp", input);
            }}
            inputValue={formik.values.no_hp}
            placeholder="08**********"
          />
          <FormErrorMessage>{formik.errors.no_hp as string}</FormErrorMessage>
        </FormControl>

        {/* Role */}
        <FormControl mb={4} isInvalid={!!formik.errors?.role}>
          <FormLabel>
            Role/Peran/Hak Akses
            <RequiredForm />
          </FormLabel>
          <SelectRole
            name="role"
            onConfirm={(input) => {
              formik.setFieldValue("role", input);
            }}
            isError={!!formik.errors.role}
            inputValue={formik.values.role}
          />
          <FormErrorMessage>{formik.errors.role as string}</FormErrorMessage>
        </FormControl>

        {/* Area kelurahan */}
        <FormControl mb={4} isInvalid={!!formik.errors?.kelurahan}>
          <FormLabel>
            Area Kelurahan
            <RequiredForm />
          </FormLabel>
          <MultiSelectKelurahan
            name="kelurahan"
            onConfirm={(input) => {
              formik.setFieldValue("kelurahan", input);
            }}
            isError={!!formik.errors.kelurahan}
            inputValue={formik.values.kelurahan}
            optionsDisplay="chip"
            isDisabled={!!!formik.values?.role?.value}
          />
          <FormErrorMessage>
            {formik.errors.kelurahan as string}
          </FormErrorMessage>
        </FormControl>

        {/* Pilih RW */}
        <FormControl mb={4} isInvalid={!!formik.errors?.rw}>
          <FormLabel>
            Area RW
            <RequiredForm />
          </FormLabel>
          <MultiSelectRW
            name="rw"
            onConfirm={(input) => {
              formik.setFieldValue("rw", input);
            }}
            isError={!!formik.errors.rw}
            inputValue={formik.values.rw}
            optionsDisplay="chip"
            options={RWOptions}
            isDisabled={
              !!!(formik.values?.role?.value === 3 && formik.values.kelurahan)
            }
          />
          <FormHelperText>Jika role Penggerak maka input RW</FormHelperText>
          <FormErrorMessage>{formik.errors.rw as string}</FormErrorMessage>
        </FormControl>

        {/* Username */}
        <FormControl mb={4} isInvalid={!!formik.errors?.newusername}>
          <FormLabel>
            Username
            <RequiredForm />
          </FormLabel>
          <StringInput
            name="newusername"
            onChangeSetter={(input) => {
              formik.setFieldValue("newusername", input);
            }}
            inputValue={formik.values.newusername}
            placeholder="jolitos.kurniawan"
          />
          <FormErrorMessage>
            {formik.errors.newusername as string}
          </FormErrorMessage>
        </FormControl>

        {/* Password */}
        {!excludeFields?.includes("password") && (
          <FormControl mb={8} isInvalid={!!formik.errors?.newpassword}>
            <FormLabel>
              Password
              <RequiredForm />
            </FormLabel>
            <PasswordInput
              name="newpassword"
              onChangeSetter={(input) => {
                formik.setFieldValue("newpassword", input);
              }}
              inputValue={formik.values.newpassword}
              placeholder="newpassword"
            />
            <FormErrorMessage>
              {formik.errors.newpassword as string}
            </FormErrorMessage>
          </FormControl>
        )}
      </form>

      <Button
        w={"100%"}
        colorScheme="ap"
        className="btn-ap clicky"
        type="submit"
        form="addUserForm"
        isLoading={loading}
      >
        Tambahkan
      </Button>
    </>
  );
}
