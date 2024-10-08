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
  Type__ActivityInitialValues,
} from "../../constant/interfaces";
import useRenderTrigger from "../../hooks/useRenderTrigger";
import useRequest from "../../hooks/useRequest";
import backOnClose from "../../lib/backOnClose";
import formatDate from "../../lib/formatDate";
import getUserData from "../../lib/getUserData";
import request from "../../lib/request";
import validateFileExtension from "../../lib/validateFIleExtension";
import SelectKelurahanbyUser from "../dependent/dedicated/SelectKelurahanbyUser";
import SelectPenggerak from "../dependent/dedicated/SelectPenggerak";
import SelectRW from "../dependent/dedicated/SelectRW";
import DatePickerModal from "../dependent/input/DatePickerModal";
import FileInputLarge from "../dependent/input/FileInputLarge";
import NumberInput from "../dependent/input/NumberInput";
import StringInput from "../dependent/input/StringInput";
import Textarea from "../dependent/input/Textarea";
import RequiredForm from "./RequiredForm";

const defaultValues = {
  pelaksana: undefined,
  kelurahan: undefined,
  rw: undefined,
  potensi_suara: undefined,
  deskripsi: "",
  tgl_mulai: undefined,
  tgl_selesai: undefined,
  tempat_aktivitas: "",
  foto_aktivitas: undefined,
};

interface Props {
  initialValues?: Type__ActivityInitialValues;
  excludeFields?: string[];
  submitUrl: string;
  submitLabel: string;
  method?: string;
}
export default function ActivityForm({
  initialValues = defaultValues,
  excludeFields,
  submitUrl,
  submitLabel,
  method,
}: Props) {
  // States
  const [RWOptions, setRWOptions] = useState<
    Interface__SelectOption[] | undefined
  >(undefined);
  const userData = getUserData();
  const userDataRef = useRef(userData);

  // Utils
  const { req, loading, status } = useRequest();
  const { rt, setRt } = useRenderTrigger();
  const rtRef = useRef(rt);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: yup.object().shape({
      pelaksana: !excludeFields?.includes("pelaksana")
        ? yup.object().required("Harus diisi")
        : yup.mixed(),
      kelurahan: !excludeFields?.includes("pelaksana")
        ? yup.object().required("Harus diisi")
        : yup.mixed(),
      rw: !excludeFields?.includes("pelaksana")
        ? yup
            .mixed()
            .test("is-required-based-on-role", "Harus diisi", function (value) {
              const { role } = this.parent as { role: Interface__SelectOption };
              // Hanya require 'rw' jika role.value bukan 2
              if (role?.value !== 2) {
                return !!value; // Return true if value is present
              }
              return true; // If role.value is 2, skip the required check
            })
        : yup.mixed(),
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
              ".jpeg",
              ".JPEG",
              ".heic",
              ".HEIC",
            ];
            return validateFileExtension(value, allowedExtensions);
          }
        )
        .test(
          "fileSize",
          "Ukuran file tidak boleh lebih dari 10MB",
          function (value) {
            if (value && value instanceof File) {
              return value.size <= 10 * 1024 * 1024; // Memeriksa ukuran file
            }
            return true; // Lewati validasi jika tidak ada file
          }
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      const url = submitUrl;

      // Form Data
      const payload = new FormData();

      // Tambahkan data ke FormData
      payload.append("pelaksana_id", `${values.pelaksana?.value}`);
      payload.append("kelurahan_id", `${values.kelurahan?.value}`);
      payload.append("rw", `${values.rw?.value}`);
      payload.append("potensi_suara", `${values.potensi_suara}`);
      payload.append("deskripsi", `${values.deskripsi}`);
      payload.append("tgl_mulai", formatDate(values.tgl_mulai, "short2"));
      payload.append("tgl_selesai", formatDate(values.tgl_selesai, "short2"));
      payload.append("tempat_aktivitas", `${values.tempat_aktivitas}`);
      if (values.foto_aktivitas) {
        payload.append("foto_aktivitas", values.foto_aktivitas);
      }
      if (method) {
        payload.append("_method", method);
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

  // Handle response status
  useEffect(() => {
    if (status === 200 || status === 201) {
      setRt(!rtRef.current);
      backOnClose();
    }
  }, [status, setRt]);

  // Handle pelaksana jika user login adalah pelaksana/penggerak
  useEffect(() => {
    // Check is user penggerak
    if (userDataRef.current?.role?.id === 3) {
      formikRef?.current?.setFieldValue("pelaksana", {
        value: userDataRef.current?.id,
        label: userDataRef.current?.nama,
        original_data: userDataRef.current,
      });
    }
  }, []);

  // Handle kelurahan by pelaksana/penggerak
  useEffect(() => {
    if (formik.values.pelaksana) {
      formikRef?.current?.setFieldValue("kelurahan", undefined);
      request(
        `/api/pemantau-suara/publik-request/get-all-kelurahan-users/${formik.values.pelaksana?.value}`
      )
        .then((r) => {
          if (r.status === 200) {
            formikRef?.current?.setFieldValue("kelurahan", {
              value: r?.data?.data?.[0]?.kode_kelurahan,
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

  // Handle RWOptions by rw pelaksana
  useEffect(() => {
    console.log(formik.values.pelaksana?.original_data?.rw_pelaksana);
    const RWOptions = formik.values.pelaksana?.original_data?.rw_pelaksana;
    setRWOptions(RWOptions);
  }, [formik.values.pelaksana]);

  return (
    <>
      <form id="activityForm" onSubmit={formik.handleSubmit}>
        {/* Penggerak */}
        {!excludeFields?.includes("pelaksana") && (
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
        )}

        {/* Kelurahan */}
        {!excludeFields?.includes("kelurahan") && (
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
        )}

        {/* Pilih RW */}
        {!excludeFields?.includes("rw") && (
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
              isDisabled={!!!formik.values.pelaksana}
            />
            <FormErrorMessage>{formik.errors.rw as string}</FormErrorMessage>
          </FormControl>
        )}

        {/* Potensi Suara */}
        <FormControl mb={4} isInvalid={!!formik.errors?.potensi_suara}>
          <FormLabel>
            Potensi Suara
            <RequiredForm />
          </FormLabel>
          <NumberInput
            name="potensi_suara"
            onChangeSetter={(input) => {
              formik.setFieldValue("potensi_suara", input);
            }}
            isError={!!formik.errors.potensi_suara}
            inputValue={formik.values.potensi_suara}
          />
          <FormErrorMessage>
            {formik.errors.potensi_suara as string}
          </FormErrorMessage>
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
            placeholder="Tanggal Mulai"
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
            placeholder="Tanggal Selesai"
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
        form="activityForm"
        isLoading={loading}
      >
        {submitLabel}
      </Button>
    </>
  );
}
