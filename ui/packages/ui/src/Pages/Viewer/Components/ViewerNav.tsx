import { ButtonGroup, Tab, Tabs, Toaster, Position } from "@blueprintjs/core";
import classNames from "classnames";
import { MouseEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SimResults } from "@gcsim/types";
import { CopyToClipboard, SaveConfig, SendToSimulator, Share } from "../../../Components/Buttons";

const btnClass = classNames("hidden ml-[7px] sm:flex");

type NavProps = {
  data: SimResults | null;
  hash: string | null;
  tabState: [string, (tab: string) => void];
  running: boolean;
};

export default ({ tabState, data, hash, running }: NavProps) => {
  const { t } = useTranslation();
  const [tabId, setTabId] = tabState;
  const toast = useRef<Toaster>(null);
  const shareState = useState<string | null>(null);

  return (
    <Tabs selectedTabId={tabId} onChange={(s) => setTabId(s as string)}>
      <Tab id="results" className="focus:outline-none">
        <a href="#" onClick={ignoreCtrlClick}>{t<string>("viewer.results")}</a>
      </Tab>
      <Tab id="config" className="focus:outline-none">
        <a href="#tab=config" onClick={ignoreCtrlClick}>{t<string>("viewer.config")}</a>
      </Tab>
      <Tab id="sample" className="focus:outline-none">
        <a href="#tab=sample" onClick={ignoreCtrlClick}>{t<string>("viewer.sample")}</a>
      </Tab>
      <Tabs.Expander />
      <ButtonGroup>
        <SaveConfig toast={toast} data={data} className={btnClass} />
        <CopyToClipboard copyToast={toast} config={data?.config_file} className={btnClass} />
        <SendToSimulator config={data?.config_file} />
        <Share
            copyToast={toast}
            shareState={shareState}
            data={data}
            hash={hash}
            running={running}
            className={btnClass} />
      </ButtonGroup>
      <Toaster ref={toast} position={Position.TOP_RIGHT} />
    </Tabs>
  );
};

function ignoreCtrlClick(e: MouseEvent) {
  if (e.ctrlKey) {
    e.stopPropagation();
  }
}