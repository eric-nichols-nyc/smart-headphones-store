import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';

export const ShinyButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      className={cn(
        'animate-bg-shine border-[1px] rounded-lg shadow bg-[length:200%_100%] tracking-wide duration-[2200ms]',
        'bg-[linear-gradient(110deg,#1e40af,45%,#3b82f6,55%,#1e40af)] text-white border-blue-700',
        props.className,
      )}
    />
  );
}; 