import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Export } from "@phosphor-icons/react";
import { useState } from "react";
import { iconSize } from "../../constant/sizes";
import download from "../../lib/download";
import request from "../../lib/request";

export default function ExportActivity() {
  // Utils
  const [loading, setLoading] = useState<boolean>(false);

  function handleExportActivity() {
    setLoading(true);
    const url = `/api/pemantau-suara/dashboard/management/export-aktivitas`;
    request
      .get(url, { responseType: "blob" })
      .then((r) => {
        if (r.status === 200) {
          console.log(r);
          download(r.data, "Aktivitas", "xls");
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Tooltip label={`Export`}>
      <IconButton
        aria-label="add-activity"
        icon={<Icon as={Export} fontSize={iconSize} />}
        colorScheme="ap"
        variant={"outline"}
        className="clicky"
        isLoading={loading}
        onClick={handleExportActivity}
      />
    </Tooltip>
  );
}
