import {Viewport} from '@ui/Components';
import {ConfigItem} from './ConfigItem';

export const ConfigList = () => {
  const configs = localStorage.getItem('gcsim-config-list');

  // TODO: add behaviour for empty config list
  if (!configs) {
    return <div>Nothing</div>;
  }

  const configList = JSON.parse(configs) as string[];

  const configObjs = configList
    .map((key) => {
      const config = localStorage.getItem(`gcsim-config.${key}`);

      // If the config is not present, log error and return undefined to be filtered later
      if (!config) {
        console.warn(`Config ${key} is listed but not present in localStorage`);
        return undefined;
      }

      // TODO: use strong types here
      const configData = JSON.parse(config);

      return <ConfigItem key={key} entry={configData} />;
    })
    .filter((o) => o);

  return (
    <Viewport>
      {/* TODO: how to actually use this to avoid loading everything at once? */}
      <div className="infinite-scroll-component_outerdiv">
        <div className="infinite-scroll-component">
          <div className="flex justify-center">
            <div className="flex flex-col hd:grid hd:grid-cols-2 gap-2">
              {configObjs}
            </div>
          </div>
        </div>
      </div>
    </Viewport>
  );
};
