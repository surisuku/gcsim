import {AvatarCard, CardBadge} from '@gcsim/components';

// TODO: really should properly typify this lmao
export const ConfigItem = ({entry}: {entry: any}) => {
  return (
    <div className="m-2 flex w-min min-[400px]:w-auto min-[400px]:max-w-full flex-col gap-3 rounded-md bg-slate-700 p-2 min-[500px]:flex-row">
      <div className="flex w-min flex-col gap-2">
        <AvatarCard
          className="flex flex-row flex-wrap justify-center gap-2 min-[400px]:flex-nowrap"
          chars={entry.character_details}
        />
        {getBadges(entry)}
      </div>
      <div className="inline-block w-0.5 self-stretch bg-slate-500"></div>
      <div className="flex w-full flex-col justify-between gap-2">
        <p className="grow text-lg text-wrap font-semibold text-orange-400">
          {entry.name}
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row min-[500px]:flex-col">
          <button className="w-full rounded-sm bg-emerald-500 p-2 text-gray-50">
            Copy Config
          </button>
          <button className="w-full rounded-sm bg-blue-500 p-2 text-gray-50">
            Open in Viewer
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex flex-row rounded-lg text-card-foreground bg-slate-800 shadow-sm m-2 pl-1 pr-3 py-3 gap-2">
      <div className="flex flex-col gap-2">
        <AvatarCard
          chars={entry.character_details}
          className="flex flex-row min-[420px]:w-[420px]"
        />
        {getBadges(entry)}
      </div>
      <div className="block w-fit">
        <h1 className="w-fit text-lg text-left font-semibold text-orange-300">
          {entry.name}
        </h1>
        <div>Button 1</div>
        <div>Button 2</div>
      </div>
    </div>
  );
};

const getBadges = (entry: any) => {
  return (
    <div className="flex w-fit flex-row flex-wrap justify-center gap-1">
      <CardBadge title="mode" value={entry.mode ? 'ttk' : 'duration'} />
      <CardBadge
        title="target count"
        value={(Object.keys(entry.target_details).length ?? 0).toString()}
      />
      <CardBadge
        title="dps"
        value={(entry.statistics?.dps?.mean ?? 0).toLocaleString(
          navigator.language,
          {
            notation: 'compact',
            minimumSignificantDigits: 3,
            maximumSignificantDigits: 3,
          },
        )}
      />
      <CardBadge
        valueCase="lowercase"
        title="avg sim time"
        value={
          entry.statistics?.duration?.mean
            ? `${entry.statistics.duration?.mean.toPrecision(3)}s`
            : 'unknown'
        }
      />
    </div>
  );
};
