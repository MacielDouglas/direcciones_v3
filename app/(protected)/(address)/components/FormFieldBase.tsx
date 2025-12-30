import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";

interface FormFieldBaseProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  children: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode;
}

export function FormFieldBase<T extends FieldValues>({
  control,
  name,
  label,
  children,
}: FormFieldBaseProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
