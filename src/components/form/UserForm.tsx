import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import {
  Interface__SelectOption,
  Type__UserInitialValues,
} from "../../constant/interfaces";
import useRenderTrigger from "../../hooks/useRenderTrigger";
import useRequest from "../../hooks/useRequest";
import backOnClose from "../../lib/backOnClose";
import createNumberArraybyGivenMaxNumber from "../../lib/createNumberArraybyGivenMaxNumber";
import formatDate from "../../lib/formatDate";
import { generateUsernameByName } from "../../lib/generateUsernameByName";
import getUserData from "../../lib/getUserData";
import MultiSelectKelurahan from "../dependent/dedicated/MultiSelectKelurahan";
import MultiSelectRW from "../dependent/dedicated/MultiSelectRW";
import SelectGender from "../dependent/dedicated/SelectGender";
import SelectKelurahan from "../dependent/dedicated/SelectKelurahan";
import SelectRole from "../dependent/dedicated/SelectRole";
import DatePickerModal from "../dependent/input/DatePickerModal";
import PasswordInput from "../dependent/input/PasswordInput";
import StringInput from "../dependent/input/StringInput";
import RequiredForm from "./RequiredForm";

const defaultValues = {
  foto_profil: "",
  nama: "",
  jenis_kelamin: undefined,
  nik_ktp: "",
  tgl_diangkat: undefined,
  no_hp: "",
  role: undefined,
  kelurahan: undefined,
  rw_pelaksana: undefined,
  newusername: "",
  newpassword: "bocahe_dewe",
};

interface Props {
  submitUrl: string;
  submitLabel: string;
  initialValues?: Type__UserInitialValues;
  excludeFields?: string[];
  method?: string;
}

export default function UserForm({
  submitUrl,
  submitLabel,
  initialValues = defaultValues,
  excludeFields,
  method,
}: Props) {
  // States
  const [RWOptions, setRWOptions] = useState<
    Interface__SelectOption[] | undefined
  >(undefined);
  const userData = getUserData();
  const isUserPj = userData?.role?.id === 2;

  // Utils
  const { req, loading, status } = useRequest();
  const { rt, setRt } = useRenderTrigger();

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
      tgl_diangkat: !excludeFields?.includes("tgl_diangkat")
        ? yup.date().required("Harus diisi")
        : yup.mixed(),
      no_hp: yup.string().required("Harus diisi"),
      role: yup.object().required("Harus diisi"),
      kelurahan: yup.mixed().required("Harus diisi"),
      // .test(
      //   "max-array-size-based-on-role",
      //   "Maksimal 1 kelurahan",
      //   function (value) {
      //     const { role } = this.parent as { role: Interface__SelectOption };
      //     // Jika role.value === 3, pastikan kelurahan maksimal hanya 1 elemen
      //     if (role?.value === 3) {
      //       return Array.isArray(value) && value.length <= 1; // Max 1 element if role.value is 3
      //     }
      //     return true; // Skip check if role.value is not 3
      //   }
      // ),
      rw_pelaksana: yup
        .mixed()
        .test("is-required-based-on-role", "Harus diisi", function (value) {
          const { role } = this.parent as { role: Interface__SelectOption };
          // Hanya require 'rw' jika role.value === 3
          if (role?.value === 3) {
            return !!value; // Return true if rw is present (required)
          }
          return true; // If role.value is not 3, skip the required check
        }),
      newusername: !excludeFields?.includes("username")
        ? yup.string().required("Harus diisi")
        : yup.mixed(),
      newpassword: !excludeFields?.includes("password")
        ? yup.string().required("Harus diisi")
        : yup.mixed(),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload = {
        foto_profil: values?.foto_profil,
        nama: values?.nama,
        jenis_kelamin: values?.jenis_kelamin?.value,
        nik_ktp: values?.nik_ktp,
        tgl_diangkat: formatDate(values?.tgl_diangkat, "short2"),
        no_hp: values?.no_hp,
        role_id: values?.role?.value,
        kelurahan_id: isUserPj
          ? [values?.kelurahan?.value]
          : values?.kelurahan?.map((kelurahan: any) => kelurahan.value),
        rw_pelaksana: values?.rw_pelaksana?.map((item) => item?.value),
        username: values?.newusername,
        password: values?.newpassword,
        _method: method,
      };

      const config = {
        url: submitUrl,
        method: "post",
        data: payload,
      };

      req({ config });
    },
  });
  const formikRef = useRef(formik);

  // Handle response status
  const prevStatus = useRef<number | null>(null);
  useEffect(() => {
    if ((status === 200 || status === 201) && prevStatus.current !== status) {
      setRt(!rt);
      prevStatus.current = status;
      backOnClose();
    }
  }, [status, setRt, rt]);

  // Handle value username by inputted nama
  useEffect(() => {
    formikRef.current.setFieldValue(
      "newusername",
      generateUsernameByName(formik.values.nama)
    );
  }, [formik.values.nama]);

  // Handle RWOptions by kelurahan
  const prevKodeKelurahan = useRef<string | undefined>(
    initialValues?.kelurahan?.kode_kelurahan
  );
  useEffect(() => {
    const currentKodeKelurahan = formik.values.kelurahan?.kode_kelurahan;
    if (prevKodeKelurahan.current !== currentKodeKelurahan) {
      formikRef.current.setFieldValue("rw_pelaksana", undefined);
    }
    prevKodeKelurahan.current = currentKodeKelurahan;
    if (formik.values.kelurahan?.original_data?.max_rw) {
      const RWOptions = createNumberArraybyGivenMaxNumber(
        formik.values.kelurahan?.original_data?.max_rw
      )?.map((rw) => ({
        value: rw,
        label: rw.toString(),
      }));
      setRWOptions(RWOptions);
    }
  }, [formik.values.kelurahan]);

  // Handle role by user login
  useEffect(() => {
    formikRef?.current.setFieldValue(
      "role",
      isUserPj
        ? { value: 3, label: "Penggerak" }
        : { value: 2, label: "Penanggung Jawab" }
    );
  }, [isUserPj]);

  return (
    <>
      <form id="userForm" onSubmit={formik.handleSubmit}>
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
        {!excludeFields?.includes("tgl_diangkat") && (
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
        )}

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
            isDisabled
          />
          <FormErrorMessage>{formik.errors.role as string}</FormErrorMessage>
        </FormControl>

        {/* Area kelurahan */}
        <FormControl mb={4} isInvalid={!!formik.errors?.kelurahan}>
          <FormLabel>
            Area Kelurahan
            <RequiredForm />
          </FormLabel>
          {isUserPj ? (
            <SelectKelurahan
              name="kelurahan"
              onConfirm={(input) => {
                formik.setFieldValue("kelurahan", input);
              }}
              isError={!!formik.errors.kelurahan}
              inputValue={formik.values.kelurahan}
              optionsDisplay="chip"
              isDisabled={!!!formik.values?.role?.value}
            />
          ) : (
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
          )}
          <FormErrorMessage>
            {formik.errors.kelurahan as string}
          </FormErrorMessage>
        </FormControl>

        {/* Pilih RW */}
        {!excludeFields?.includes("rw_pelaksana") && (
          <>
            {isUserPj && (
              <FormControl mb={4} isInvalid={!!formik.errors?.rw_pelaksana}>
                <FormLabel>
                  Area RW
                  <RequiredForm />
                </FormLabel>
                <MultiSelectRW
                  name="rw_pelaksana"
                  onConfirm={(input) => {
                    formik.setFieldValue("rw_pelaksana", input);
                  }}
                  isError={!!formik.errors.rw_pelaksana}
                  inputValue={formik.values.rw_pelaksana}
                  optionsDisplay="chip"
                  options={RWOptions}
                  isDisabled={
                    !!!(
                      formik.values?.role?.value === 3 &&
                      formik.values.kelurahan
                    )
                  }
                />
                {/* <FormHelperText>Jika role Penggerak maka input RW</FormHelperText> */}
                <FormErrorMessage>
                  {formik.errors.rw_pelaksana as string}
                </FormErrorMessage>
              </FormControl>
            )}
          </>
        )}

        {/* Username */}
        {!excludeFields?.includes("username") && (
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
        )}

        {/* Password */}
        {!excludeFields?.includes("password") && (
          <FormControl mb={4} isInvalid={!!formik.errors?.newpassword}>
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
        mt={4}
        w={"100%"}
        colorScheme="ap"
        className="btn-ap clicky"
        type="submit"
        form="userForm"
        isLoading={loading}
      >
        {submitLabel}
      </Button>
    </>
  );
}
