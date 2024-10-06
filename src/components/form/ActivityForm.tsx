import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { Interface__SelectOption } from "../../constant/interfaces";
import useRequest from "../../hooks/useRequest";
import createNumberArraybyGivenMaxNumber from "../../lib/createNumberArraybyGivenMaxNumber";
import getUserData from "../../lib/getUserData";
import validateFileExtension from "../../lib/validateFIleExtension";
import MultiSelectRW from "../dependent/dedicated/MultiSelectRW";
import SelectKelurahanbyUser from "../dependent/dedicated/SelectKelurahanbyUser";
import StringInput from "../dependent/input/StringInput";
import Textarea from "../dependent/input/Textarea";
import RequiredForm from "./RequiredForm";
import DatePickerModal from "../dependent/input/DatePickerModal";
import FileInput from "../dependent/input/FileInput";

type Type__InitialValues = {
  pelaksana?: string;
  nama_aktivitas?: string;
  kelurahan?: Interface__SelectOption;
  rw?: Interface__SelectOption[];
  deskripsi?: string;
  tgl_mulai?: Date;
  tgl_selesai?: Date;
  tempat_aktivitas?: string;
  foto_aktivitas?: any;
};

const defaultValues = {
  pelaksana: undefined,
  nama_aktivitas: "",
  kelurahan: undefined,
  rw: undefined,
  deskripsi: "",
  tgl_mulai: undefined,
  tgl_selesai: undefined,
  tempat_aktivitas: "",
  foto_aktivitas: undefined,
};

interface Props {
  initialValues?: Type__InitialValues;
  excludeFields?: string[];
}
export default function ActivityForm({
  initialValues = defaultValues,
  excludeFields,
}: Props) {
  // States
  const [RWOptions, setRWOptions] = useState<
    Interface__SelectOption[] | undefined
  >(undefined);
  const userData = getUserData();

  // Utils
  const { req, loading } = useRequest();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: yup.object().shape({
      pelaksana: yup.object().required("Harus diisi"),
      nama_aktivitas: yup.string().required("Harus diisi"),
      kelurahan: yup.object().required("Harus diisi"),
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
      deskripsi: yup.string().required("Harus diisi"),
      tgl_mulai: yup.date().required("Harus diisi"),
      tgl_selesai: yup.date().required("Harus diisi"),
      tempat_aktivitas: yup.string().required("Harus diisi"),
      foto_aktivitas: yup
        .mixed()
        .test(
          "fileType",
          "Hanya file dengan ekstensi .PNG, .JPG, .HEIC yang diperbolehkan",
          function (value) {
            const allowedExtensions = [
              ".png",
              ".PNG",
              ".jpg",
              ".JPG",
              ".heic",
              ".HEIC",
            ];
            return validateFileExtension(value, allowedExtensions);
          }
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      const url = `/api/pemantau-suara/dashboard/management/aktivitas`;
      const payload = {
        nama_aktivitas: values?.nama_aktivitas,
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

  // Handle pelaksana by user login (pelaksana/penggerak)
  useEffect(() => {
    // Check is user penggerak
    if (userData?.role?.id === 3) {
      formikRef?.current?.setFieldValue("pelaksana", {
        value: userData?.id,
        label: userData?.nama,
      });
    }
  }, [userData]);

  // Handle RWOptions by kelurahan
  useEffect(() => {
    const RWOptions = createNumberArraybyGivenMaxNumber(
      formik.values?.kelurahan?.original_data?.max_rw
    )?.map((rw) => ({
      value: rw,
      label: rw.toString(),
    }));
    setRWOptions(RWOptions);
  }, [formik.values.kelurahan]);

  return (
    <>
      <form id="addActivityForm" onSubmit={formik.handleSubmit}>
        {/* Penggerak */}
        <FormControl mb={4} isInvalid={!!formik.errors?.pelaksana}>
          <FormLabel>
            Penggerak
            <RequiredForm />
          </FormLabel>
          <StringInput
            name="pelaksana"
            onChangeSetter={(input) => {
              formik.setFieldValue("pelaksana", input);
            }}
            inputValue={formik.values.pelaksana}
            placeholder="Jolitos Kurniawan"
          />
          <FormErrorMessage>
            {formik.errors.pelaksana as string}
          </FormErrorMessage>
        </FormControl>

        {/* Nama Aktivitas */}
        <FormControl mb={4} isInvalid={!!formik.errors?.nama_aktivitas}>
          <FormLabel>
            Nama Aktivitas
            <RequiredForm />
          </FormLabel>
          <StringInput
            name="nama_aktivitas"
            onChangeSetter={(input) => {
              formik.setFieldValue("nama_aktivitas", input);
            }}
            inputValue={formik.values.nama_aktivitas}
            placeholder="Cari suara rakyat"
          />
          <FormErrorMessage>
            {formik.errors.nama_aktivitas as string}
          </FormErrorMessage>
        </FormControl>

        {/* Kelurahan */}
        <FormControl mb={4} isInvalid={!!formik.errors?.kelurahan}>
          <FormLabel>
            Kelurahan
            <RequiredForm />
          </FormLabel>
          <SelectKelurahanbyUser
            name="kelurahan"
            onConfirm={(input) => {
              formik.setFieldValue("kelurahan", input);
            }}
            isError={!!formik.errors.kelurahan}
            inputValue={formik.values.kelurahan}
            optionsDisplay="chip"
          />
          <FormErrorMessage>
            {formik.errors.kelurahan as string}
          </FormErrorMessage>
        </FormControl>

        {/* Pilih RW */}
        <FormControl mb={4} isInvalid={!!formik.errors?.rw}>
          <FormLabel>
            RW
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
            isDisabled={!!!formik.values.kelurahan}
          />
          <FormErrorMessage>{formik.errors.rw as string}</FormErrorMessage>
        </FormControl>

        {/* Deskripsi */}
        <FormControl mb={4} isInvalid={!!formik.errors?.deskripsi}>
          <FormLabel>
            Deskripsi
            <RequiredForm />
          </FormLabel>
          <Textarea
            name="deskripsi"
            onChangeSetter={(input) => {
              formik.setFieldValue("deskripsi", input);
            }}
            inputValue={formik.values.deskripsi}
            placeholder="Tulis Deskripsi Aktivitas"
          />
          <FormErrorMessage>
            {formik.errors.deskripsi as string}
          </FormErrorMessage>
        </FormControl>

        {/* Tanggal mulai */}
        <FormControl mb={4} isInvalid={!!formik.errors?.tgl_mulai}>
          <FormLabel>
            Tanggal Mulai
            <RequiredForm />
          </FormLabel>
          <DatePickerModal
            id={`add-user`}
            name="tgl_mulai"
            onConfirm={(input) => {
              formik.setFieldValue("tgl_mulai", input);
            }}
            inputValue={formik.values.tgl_mulai}
            isError={!!formik.errors.tgl_mulai}
            placeholder="Tanggal Diangkat"
          />
          <FormErrorMessage>
            {formik.errors.tgl_mulai as string}
          </FormErrorMessage>
        </FormControl>

        {/* Tanggal selesai */}
        <FormControl mb={4} isInvalid={!!formik.errors?.tgl_selesai}>
          <FormLabel>
            Tanggal Selesai
            <RequiredForm />
          </FormLabel>
          <DatePickerModal
            id={`add-user`}
            name="tgl_selesai"
            onConfirm={(input) => {
              formik.setFieldValue("tgl_selesai", input);
            }}
            inputValue={formik.values.tgl_selesai}
            isError={!!formik.errors.tgl_selesai}
            placeholder="Tanggal Diangkat"
          />
          <FormErrorMessage>
            {formik.errors.tgl_selesai as string}
          </FormErrorMessage>
        </FormControl>

        {/* Tempat Aktivitas */}
        <FormControl mb={4} isInvalid={!!formik.errors?.tempat_aktivitas}>
          <FormLabel>
            Tempat Aktivitas
            <RequiredForm />
          </FormLabel>
          <StringInput
            name="tempat_aktivitas"
            onChangeSetter={(input) => {
              formik.setFieldValue("tempat_aktivitas", input);
            }}
            inputValue={formik.values.tempat_aktivitas}
            placeholder="Lapangan Bangetayu"
          />
          <FormErrorMessage>
            {formik.errors.tempat_aktivitas as string}
          </FormErrorMessage>
        </FormControl>

        {/* Foto Aktivitas */}
        <FormControl mb={8} isInvalid={!!formik.errors?.foto_aktivitas}>
          <FormLabel>
            Foto Aktivitas
            <RequiredForm />
          </FormLabel>
          <FileInput
            name="foto_aktivitas"
            onChangeSetter={(input) => {
              formik.setFieldValue("foto_aktivitas", input);
            }}
            inputValue={formik.values.foto_aktivitas}
            isError={!!formik.errors?.foto_aktivitas}
          />
          <FormErrorMessage>
            {formik.errors.foto_aktivitas as string}
          </FormErrorMessage>
        </FormControl>
      </form>

      <Button
        w={"100%"}
        colorScheme="ap"
        className="btn-ap clicky"
        type="submit"
        form="addActivityForm"
        isLoading={loading}
      >
        Tambahkan
      </Button>
    </>
  );
}
