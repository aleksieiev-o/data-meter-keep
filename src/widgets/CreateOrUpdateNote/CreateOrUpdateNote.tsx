import {FC, ReactElement} from 'react';
import CreateOrUpdateNoteForm from '@/features/notes/CreateOrUpdateNote.form';

interface Props {
  variant: 'create' | 'update';
}

const CreateOrUpdateNote: FC<Props> = (props): ReactElement => {
  const {variant} = props;

  return (
    <section className={'w-full h-full max-w-[512px] flex flex-col items-start justify-center gap-6 py-4 md:py-8'}>
      <div className={'flex flex-col items-start justify-center gap-4'}>
        <h2 className={'font-bold text-3xl'}>
          {variant === 'create' ? 'Create note' : 'Update note'}
        </h2>

        <p className={'text-sm text-muted-foreground'}>
          The note contains data and belongs to one of the categories.
        </p>
      </div>

      <CreateOrUpdateNoteForm variant={variant}/>
    </section>
  );
};

export default CreateOrUpdateNote;
