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
      <div className="infinite-scroll-component_outerdiv">
        <div className="infinite-scroll-component">
          <div className="flex flex-col bg-slate-500 p-5 gap-2 justify-center">
            <div
              id="card"
              className="flex flex-row rounded-lg p-2 mx-auto bg-slate-300">
              <div
                id="left-column"
                className="flex flex-col flex-initial bg-emerald-600">
                <div
                  id="avatars"
                  className="flex flex-row flex-wrap flex-initial gap-2 p-2 bg-blue-700">
                  <div className="bg-red-600 size-24"></div>
                  <div className="bg-red-600 size-24"></div>
                  <div className="bg-red-600 size-24"></div>
                  <div className="bg-red-600 size-24"></div>
                </div>
                <div
                  id="tags"
                  className="flex flex-row flex-wrap justify-center gap-2 p-2 bg-pink-500">
                  <div className="block size-fit bg-purple-800 p-1 rounded-md">
                    sadgasgasg
                  </div>
                  <div className="block size-fit bg-purple-800 p-1 rounded-md">
                    asaf
                  </div>
                  <div className="block size-fit bg-purple-800 p-1 rounded-md">
                    asdgsadgasgadshadhadhafhf
                  </div>
                  <div className="block size-fit bg-purple-800 p-1 rounded-md">
                    asas
                  </div>
                  <div className="block size-fit bg-purple-800 p-1 rounded-md">
                    asfasf
                  </div>
                  <div className="block size-fit bg-purple-800 p-1 rounded-md">
                    asdgsadgasgadshadhadhafhfsdadshahahadh
                  </div>
                </div>
              </div>
              <div
                id="right-column"
                className="flex flex-col bg-blue-400 max-w-xs">
                <div id="title">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. At
                  aliquid numquam in beatae voluptatibus, assumenda enim quia,
                  sit impedit explicabo quod? Iusto quaerat cumque placeat
                  facilis magnam incidunt odio nisi.
                </div>
                <div id="button-1">button 1</div>
                <div id="button-2">button 2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Viewport>
  );

  // // TODO: properly implement infinite scrolling
  // return (
  //   <Viewport className="flex flex-col gap-2">
  //     <div className="infinite-scroll-component_outerdiv">
  //       <div className="infinite-scroll-component">
  //         <div className="flex flex-col gap-2 justify-center align-middle items-center">
  //           {configObjs}
  //         </div>
  //       </div>
  //     </div>
  //   </Viewport>
  // );
};
