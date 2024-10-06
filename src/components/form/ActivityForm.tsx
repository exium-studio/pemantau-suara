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
import request from "../../lib/request";
import validateFileExtension from "../../lib/validateFIleExtension";
import SelectKelurahanbyUser from "../dependent/dedicated/SelectKelurahanbyUser";
import SelectPenggerak from "../dependent/dedicated/SelectPenggerak";
import SelectRW from "../dependent/dedicated/SelectRW";
import DatePickerModal from "../dependent/input/DatePickerModal";
import FileInputLarge from "../dependent/input/FileInputLarge";
import StringInput from "../dependent/input/StringInput";
import Textarea from "../dependent/input/Textarea";
import RequiredForm from "./RequiredForm";
import formatDate from "../../lib/formatDate";

type Type__InitialValues = {
  pelaksana?: Interface__SelectOption;
  kelurahan?: Interface__SelectOption;
  rw?: Interface__SelectOption;
  deskripsi?: string;
  tgl_mulai?: Date;
  tgl_selesai?: Date;
  tempat_aktivitas?: string;
  foto_aktivitas?: any;
};

const defaultValues = {
  pelaksana: undefined,
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

      // Form Data
      const payload = new FormData();

      // Tambahkan data ke FormData
      payload.append("pelaksana_id", values.pelaksana?.value);
      payload.append("kelurahan_id", values.kelurahan?.value);
      payload.append("rw", values.rw?.value);
      payload.append("deskripsi", values.deskripsi as string);
      payload.append("tgl_mulai", formatDate(values.tgl_mulai, "short2"));
      payload.append("tgl_selesai", formatDate(values.tgl_selesai, "short2"));
      payload.append("tempat_aktivitas", values.tempat_aktivitas as string);
      if (values.foto_aktivitas) {
        payload.append("foto_aktivitas", values.foto_aktivitas);
      }

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

  // Handle kelurahan by pelaksana/penggerak
  useEffect(() => {
    if (formik.values.pelaksana) {
      request(
        `/api/pemantau-suara/publik-request/get-all-kelurahan-users/${formik.values.pelaksana?.value}`
      )
        .then((r) => {
          if (r.status === 200) {
            formikRef?.current?.setFieldValue("kelurahan", {
              value: r?.data?.data?.[0]?.id,
              label: r?.data?.data?.[0]?.nama_kelurahan,
              original_data: r?.data?.data?.[0],
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [formik.values.pelaksana]);

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
          <SelectPenggerak
            name="pelaksana"
            onConfirm={(input) => {
              formik.setFieldValue("pelaksana", input);
            }}
            isDisabled={userData?.role?.id === 3}
            inputValue={formik.values.pelaksana}
          />
          <FormErrorMessage>
            {formik.errors.pelaksana as string}
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
            isDisabled={true}
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
          <SelectRW
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
          <FileInputLarge
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
