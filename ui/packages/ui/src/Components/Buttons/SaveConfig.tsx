import {
  Button,
  Classes,
  Dialog,
  FormGroup,
  Icon,
  InputGroup,
  Intent,
  Toaster,
} from '@blueprintjs/core';
import {LocalConfig} from '@ui/Pages';
import classNames from 'classnames';
import {memo, RefObject, useState} from 'react';
import {useTranslation} from 'react-i18next';

type Props = {
  toast: RefObject<Toaster>;
  data?: LocalConfig;
  className?: string;
};

// TODO: add popup for naming team
const SaveConfig = ({toast, data, className}: Props) => {
  const {t} = useTranslation();

  const [showDialog, setShowDialog] = useState(false);

  const onSave = () => {
    if (!data) {
      toast.current?.show({
        // TODO: need a new copy for the toast
        message: "Couldn't save",
        intent: Intent.WARNING,
        timeout: 2000,
      });
    }

    setShowDialog(true);
  };

  const onConfirm = (name: string) => {
    // TODO: append id to storage
    // TODO: add config to storage

    console.log(`Saved config with name ${name}`);

    toast.current?.show({
      // TODO: need a new copy for the toast
      message: 'Did something',
      intent: Intent.SUCCESS,
      timeout: 2000,
    });

    setShowDialog(false);
  };

  return (
    <>
      <Button icon={<Icon icon="archive" className="!mr-0" />} onClick={onSave}>
        {/* TODO: need a new copy for the button */}
        <div className={className}>{t('viewer.copy')}</div>
      </Button>
      <Dialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        // Need a new copy for the label
        title={'Save config'}
        icon="archive"
        className="!pb-0">
        <div
          className={classNames(
            Classes.DIALOG_BODY,
            'flex flex-col justify-center gap-2',
          )}>
          <DialogBody onConfirm={onConfirm} />
        </div>
      </Dialog>
    </>
  );
};

type DialogProps = {
  onConfirm: (name: string) => void;
};

const DialogBody = ({onConfirm}: DialogProps) => {
  const [name, setName] = useState('');

  return (
    // TODO: new copy for label
    <FormGroup label={'Team name'}>
      <InputGroup
        fill={true}
        value={name}
        onChange={(e) => setName(e.target.value)}
        // Not the best way to do it, but avoiding using react-hook-form
        onKeyDown={(e) => {
          e.key === 'Enter' && onConfirm(name);
        }}
        inputClassName="!shadow-none"
        large={true}
        rightElement={
          <Button
            type="submit"
            icon="archive"
            onClick={() => onConfirm(name)}
          />
        }
      />
    </FormGroup>
  );
};

export default memo(SaveConfig);
