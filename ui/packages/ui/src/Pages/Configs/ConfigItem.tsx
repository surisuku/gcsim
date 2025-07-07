import {AvatarCard, CardBadge} from '@gcsim/components';

// TODO: really should properly typify this lmao
export const ConfigItem = ({entry}: {entry: any}) => {
  return (
    <div className="m-2 flex w-full min-[420px]:w-min md:w-auto md:max-w-full flex-col gap-3 rounded-md bg-slate-700 p-2">
      <div className="flex w-full min-[420px]:w-min flex-col gap-2">
        <AvatarCard
          className="flex flex-row flex-wrap justify-center gap-2 min-[420px]:flex-nowrap w-full min-[420px]:w-[420px] max-w-full"
          chars={entry.character_details}
        />
        {getBadges(entry)}
      </div>
      <div className="inline-block h-0.5 w-auto self-stretch bg-slate-500"></div>
      <div className="flex w-full flex-col justify-between gap-2">
        <p className="grow text-lg text-wrap font-semibold text-orange-400">
          {entry.name}
        </p>
        {/* TODO: buttons */}
        <div className="flex flex-col gap-2 min-[420px]:flex-row">
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
};

const getBadges = (entry: any) => {
  return (
    <div className="flex w-full flex-row flex-wrap justify-center gap-1">
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
