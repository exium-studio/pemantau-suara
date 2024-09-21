import useDataState from "../../hooks/useDataState";
import CustomTableContainer from "./wrapper/CustomTableContainer";

export default function TabelUserByKelurahan() {
  const formattedHeader = [];
  const formattedBody = [];

  const dummy = [];

  const { error, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: ``,
    dependencies: [],
  });

  return <CustomTableContainer>{/* <CustomTable /> */}</CustomTableContainer>;
}
