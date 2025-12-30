import { Textarea } from "@/components/ui/textarea";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormFieldBase } from "./FormFieldBase";

interface FormTextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rows?: number;
}

export function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
  rows = 3,
}: FormTextareaProps<T>) {
  return (
    <FormFieldBase control={control} name={name} label={label}>
      {(field) => <Textarea {...field} rows={rows} className="text-base" />}
    </FormFieldBase>
  );
}
