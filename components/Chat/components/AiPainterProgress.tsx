import { IconArrowUp, IconCheck, IconX } from '@tabler/icons-react';

import Spinner from '@/components/Spinner/Spinner';

// THE COMPONENT IS USED FOR STATIC HTML GENERATION, SO DON'T USE HOOKS OR STATE

export interface AiPainterProgressProps {
  content: string;
  state: 'loading' | 'completed' | 'error';
}
export default function AiPainterProgress({
  content,
  state,
}: AiPainterProgressProps) {
  return (
    <details
      className={`${state === 'loading' ? 'bg-white disabled' : ''} ${
        state === 'completed' ? 'bg-green-200' : ''
      } ${
        state === 'error' ? 'bg-red-200' : ''
      } relative my-4 block text-black rounded-lg`}
      open={state === 'loading'}
    >
      <summary className="cursor-pointer p-2 flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center flex-grow font-bold">
          {state === 'loading' && <Spinner size="16px" />}
          {state === 'loading' && 'Loading...'}
          {state === 'error' && <IconX size="16px" />}
          {state === 'completed' && <IconCheck size="16px" />}
          {state !== 'loading' &&
            state.charAt(0).toUpperCase() + state.slice(1)}
        </div>

        {state !== 'loading' && (
          <>
            <IconArrowUp className="toggle-arrow h-3" />
          </>
        )}
      </summary>
      <main>
        <div className="panel p-2 max-h-full">{content}</div>
      </main>
    </details>
  );
}
