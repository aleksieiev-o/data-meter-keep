import {FC, ReactElement} from 'react';
import CreateOrUpdateNoteForm from '@/features/notes/CreateOrUpdateNote.form';

interface Props {
  variant: 'create' | 'update';
}

const CreateOrUpdateNote: FC<Props> = (props): ReactElement => {
  const {variant} = props;

  return (
    <section
      className={
        'flex h-full w-full max-w-[512px] flex-col items-start justify-center gap-6 py-4 md:py-8'
      }
    >
      <div className={'flex flex-col items-start justify-center gap-4'}>
        <h2 className={'text-3xl font-bold'}>
          {variant === 'create' ? 'Create note' : 'Update note'}
        </h2>

        <p className={'text-sm text-muted-foreground'}>
          The note contains data and belongs to one of the categories.
        </p>
      </div>

      <CreateOrUpdateNoteForm variant={variant} />
    </section>
  );
};

export default CreateOrUpdateNote;
