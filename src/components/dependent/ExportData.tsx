import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { iconSize } from "../../constant/sizes";
import download from "../../lib/download";
import request from "../../lib/request";
import { Export } from "@phosphor-icons/react";

interface Props {
  tooltipLabel?: string;
  url: string;
  fileName: string;
  ext: string;
}

export default function ExportData({
  tooltipLabel,
  url,
  fileName,
  ext,
}: Props) {
  // Utils
  const [loading, setLoading] = useState<boolean>(false);

  function handleExportActivity() {
    setLoading(true);
    request
      .get(url, { responseType: "blob" })
      .then((r) => {
        if (r.status === 200) {
          // console.log(r);
          download(r.data, fileName, ext);
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Tooltip label={tooltipLabel || `Export`} openDelay={500}>
      <IconButton
        aria-label="add-activity"
        icon={<Icon as={Export} fontSize={iconSize} weight="bold" />}
        colorScheme="ap"
        variant={"outline"}
        className="clicky"
        isLoading={loading}
        onClick={handleExportActivity}
      />
    </Tooltip>
  );
}
